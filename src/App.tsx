import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import type { LayoutType } from "./types"
import LayoutSelector from "./components/LayoutSelector/LayoutSelector"
import CameraView from "./components/CameraView/CameraView"
import LayoutPreviewPage from "./pages/LayoutPreviewPage"


function App() {
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | null>(null)
  const navigate = useNavigate()

  const handleLayoutSelect = (layout: LayoutType) => {
    setSelectedLayout(layout)
    navigate("/camera")
  }

  const handleBackToLayout = () => {
    setSelectedLayout(null)
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-main-gradient">
      <Routes>
        <Route path="/" element={<LayoutSelector onLayoutSelect={handleLayoutSelect} />} />
        <Route
          path="/camera"
          element={
            selectedLayout && (
              <CameraView layout={selectedLayout} onBack={handleBackToLayout} />
            )
          }
        />
         <Route path="/LayoutPreviewPage" element={<LayoutPreviewPage />} />
        
      </Routes>
    </div>
  )
}

export default App
