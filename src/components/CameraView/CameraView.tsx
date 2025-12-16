import React, { useEffect, useRef, useState } from "react"
import Countdown from "./Countdown"
import FilterPanel from "../FilterPanel/FilterPanel"
import type { FilterType } from "../../types"
import { FILTERS } from "../../utils/filters"
import { useNavigate } from "react-router-dom"

const CameraView: React.FC<{ layout: number; onBack: () => void }> = ({
  layout,
  onBack,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const sidebarRef = useRef<HTMLDivElement | null>(null)

  const [photos, setPhotos] = useState<string[]>([])
  const [isCounting, setIsCounting] = useState(false)
  const [currentShot, setCurrentShot] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("none")
  const [photoHeight, setPhotoHeight] = useState<number>(200)
  const navigate = useNavigate()

  const currentCssFilter =
    FILTERS.find((f) => f.id === selectedFilter)?.cssFilter || "none"

  const startCamera = async () => {
    if (!videoRef.current) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      await videoRef.current.play()
    } catch (err) {
      console.error("Camera error:", err)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.filter = currentCssFilter
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const photoData = canvas.toDataURL("image/png")

    setPhotos((prev) => {
      const newPhotos = [...prev]
      newPhotos[currentShot] = photoData
      return newPhotos
    })

    stopCamera()
    setIsCounting(false)

    if (currentShot + 1 < layout) {
      setTimeout(() => {
        setCurrentShot((s) => s + 1)
        startCamera()
        setIsCounting(true)
      }, 500)
    }
  }

  const handleShutter = () => {
    if (!isCounting && currentShot < layout) {
      setIsCounting(true)
    }
  }

  const resetPhotos = () => {
    setPhotos(Array(layout).fill(""))
    setCurrentShot(0)
    startCamera()
    setIsCounting(false)
  }

  //  Dynamic photo height calculation
  useEffect(() => {
    const computeHeights = () => {
      const sidebar = sidebarRef.current
      const visibleCount = photos.filter(Boolean).length || layout || 1
      const sidebarH = sidebar?.clientHeight ?? window.innerHeight
      const padding = 32
      const gap = 12
      const available = sidebarH - padding - (visibleCount - 1) * gap
      const per = Math.max(
        120,
        Math.min(320, Math.floor(available / visibleCount))
      )
      setPhotoHeight(per)
    }

    computeHeights()
    window.addEventListener("resize", computeHeights)
    return () => window.removeEventListener("resize", computeHeights)
  }, [photos.length, layout])

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  return (
    <div className="camera-page flex flex-col md:flex-row h-screen bg-gradient-to-br from-rose-300 via-pink-200 to-purple-300">
      {/* Left side */}
      <div className="flex-1 flex flex-col items-center justify-center relative p-6 gap-y-6">
        {/* Top buttons */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:left-8 px-4 py-2 rounded-lg bg-pink-900 text-white hover:bg-pink-800 hover:scale-105 transition shadow-lg"
        >
          ⬅ Back
        </button>
        <button
          onClick={resetPhotos}
          className="absolute top-4 right-4 md:right-8 px-4 py-2 rounded-lg border-2 border-pink-900 text-pink-900 hover:bg-pink-900 hover:text-white hover:scale-105 transition shadow-lg"
        >
          Reset
        </button>

        {/* Camera */}
        <div className="w-[280px] sm:w-[320px] h-[360px] sm:h-[350px] bg-pink-200 border-[3px] border-pink-800 shadow-lg flex items-center justify-center relative rounded-xl overflow-hidden">
          {currentShot >= layout ? (
            <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-rose-700">
              nice clicks
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                style={{ filter: currentCssFilter }}
              />
              <canvas ref={canvasRef} className="hidden" />
              {isCounting && (
                <div className="absolute text-6xl font-extrabold text-gray-100 drop-shadow-lg">
                  <Countdown seconds={3} onComplete={capturePhoto} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Shutter */}
        {!isCounting && currentShot < layout && (
          <button
            onClick={handleShutter}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-[3px] border-white bg-gradient-to-br from-rose-500 to-pink-600 shadow-xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white" />
          </button>
        )}


        {/* Filters - only show until all photos are captured */}
        {photos.filter(Boolean).length < layout && (
          <FilterPanel
            selectedFilter={selectedFilter}
            onFilterSelect={setSelectedFilter}
          />
        )}

        {/* After photos are captured */}
        {photos.filter(Boolean).length === layout && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() =>
                navigate("/LayoutPreviewPage", { state: { photos } })
              }
              className="px-6 py-3 rounded-xl bg-rose-800 text-white font-semibold hover:bg-rose-900 transition shadow-lg"
            >
              Generate Layout
            </button>
          </div>
        )}
        </div>

      {/* Sidebar photos - only show if any exist */}
      {photos.filter(Boolean).length > 0 && (
        <div
          ref={sidebarRef}
          className="photos-side w-full md:w-[260px] flex justify-center bg-gradient-to-br from-pink-200 via-purple-300 to-rose-300 border-l border-pink-300 p-2 overflow-y-auto animate-slide-in"
        >
          <div className="bg-black p-2 rounded-md h-full flex flex-col justify-center">
            <div className="flex flex-col gap-3 h-full items-center">
              {photos.map(
                (p, i) =>
                  p && (
                    <div
                      key={i}
                      className="border border-black shadow-lg w-[200px] flex items-center justify-center"
                      style={{ height: `${photoHeight}px` }}
                    >
                      <img
                        src={p}
                        alt={`Photo #${i + 1}`}
                        className="w-[95%] h-[95%] object-cover"
                      />
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Scrollbar styling + slide-in animation */}
      <style>
        {`
          .photos-side::-webkit-scrollbar {
            width: 8px;
          }
          .photos-side::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #ec4899, #8b5cf6);
            border-radius: 4px;
          }
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slideIn 0.4s ease-out;
          }
        `}
      </style>
    </div>
  )
}

export default CameraView
