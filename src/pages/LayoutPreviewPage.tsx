import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import LayoutControls from "../components/LayoutPreview/LayoutControls";

const LayoutPreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photos = location.state?.photos || [];

  const [frameColor, setFrameColor] = useState("pink");
  const [orientation, setOrientation] = useState("vertical");
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: frameColor,
    });

    const link = document.createElement("a");
    link.download = "polaroid.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-200 to-purple-300 p-5 flex flex-col items-center">
      {/* Back Button + Heading */}
      <div className="flex gap-8 relative w-full justify-center">
        <button
          onClick={() => navigate("/camera")}
          className="absolute top-0 left-0 md:left-8 px-4 py-2 rounded-lg bg-pink-900 text-white hover:bg-pink-800 hover:scale-105 transition shadow-lg"
        >
          ⬅ Back
        </button>

        <h2 className="text-4xl font-bold text-pink-900 drop-shadow-md mb-8">
          Layout Preview
        </h2>
      </div>

      {/* Controls */}
      <div className="mb-8">
        <LayoutControls
          frameColor={frameColor}
          setFrameColor={setFrameColor}
          orientation={orientation}
          setOrientation={setOrientation}
        />
      </div>

      {/* ===== PREVIEW AREA (CAPTURED) ===== */}
      <div
        ref={previewRef}
        className="rounded-xl shadow-2xl flex flex-col items-center justify-center mb-8"
        style={{
          backgroundColor: frameColor,
          padding: "15px 15px 40px 15px",
        }}
      >
        <div
          className={`flex ${
            orientation === "vertical"
              ? "flex-col gap-4"
              : "flex-row gap-4"
          }`}
        >
          {photos.map((photo: string, index: number) => (
            <img
              key={index}
              src={photo}
              alt={`Captured ${index}`}
              crossOrigin="anonymous"
              className="rounded-md object-cover w-[200px] h-[250px]"
            />
          ))}
        </div>

        {(caption || date) && (
          <div className="mt-4 text-center text-pink-900 font-semibold">
            {caption && <p>{caption}</p>}
            {date && <p>{new Date(date).toLocaleDateString()}</p>}
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Add caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="px-3 py-2 rounded-lg border border-pink-400 shadow"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-3 py-2 rounded-lg border border-pink-400 shadow"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-6">
        <button
          onClick={handleDownload}
          className="px-6 py-3 rounded-lg bg-rose-700 text-white font-semibold hover:bg-rose-600 transition shadow-lg"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default LayoutPreviewPage;
