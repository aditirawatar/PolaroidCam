import { useState } from 'react'
import type { LayoutType } from './types'
import LayoutSelector from './components/LayoutSelector/LayoutSelector'
import CameraView from './components/CameraView/CameraView'


function App() {
  const [currentView, setCurrentView] = useState<'layout' | 'camera'>('layout')
  const [selectedLayout, setSelectedLayout] = useState<LayoutType | null>(null)

  const handleLayoutSelect = (layout: LayoutType) => {
    setSelectedLayout(layout)
    setCurrentView('camera')
  }

  const handleBackToLayout = () => {
    setCurrentView('layout')
    setSelectedLayout(null)
  }

  return (
    <div className="min-h-screen bg-main-gradient">
      {currentView === 'layout' && (
        <LayoutSelector onLayoutSelect={handleLayoutSelect} />
      )}
      
      {currentView === 'camera' && selectedLayout && (
        <CameraView 
          layout={selectedLayout} 
          onBack={handleBackToLayout}
        />
      )}
    </div>
  )
}

export default App