import type { LayoutType } from '../../types'

interface Props {
  layout: LayoutType
  onBack: () => void
}

const CameraView = ({ layout, onBack }: Props) => {
  return (
    <div className="min-h-screen bg-main-gradient p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 bg-white/20 
                   backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-blue">
            {layout} Photo Layout
          </h2>
          <p className="text-gray-700">Get ready for some vintage magic!</p>
        </div>
        
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Placeholder Content */}
      <div className="flex items-center justify-center h-96">
        <div className="bg-card-gradient backdrop-blur-sm rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📷</div>
          <h3 className="text-xl font-semibold text-slate-blue mb-2">
            Camera Coming Soon!
          </h3>
          <p className="text-gray-600">
            Selected: {layout} photo layout
          </p>
        </div>
      </div>
    </div>
  )
}

export default CameraView