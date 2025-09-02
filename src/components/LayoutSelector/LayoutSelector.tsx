import type { LayoutType } from '../../types'

interface Props {
  onLayoutSelect: (layout: LayoutType) => void
}

const LayoutSelector = ({ onLayoutSelect }: Props) => {
  const layouts: { count: LayoutType; label: string; description: string }[] = [
    { count: 3, label: 'Classic Trio', description: 'Perfect for close friends' },
    { count: 5, label: 'Fab Five', description: 'Group memories' },
    { count: 7, label: 'Lucky Seven', description: 'Big moments' },
    { count: 9, label: 'The Full Story', description: 'Complete experience' }
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-blue mb-4">
          📸 Polaroid Booth
        </h1>
        <p className="text-xl text-gray-700 max-w-md">
          Choose your layout and create vintage memories instantly
        </p>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {layouts.map(({ count, label, description }) => (
          <div
            key={count}
            onClick={() => onLayoutSelect(count)}
            className="bg-card-gradient backdrop-blur-sm rounded-2xl p-8 cursor-pointer 
                     transform hover:scale-105 transition-all duration-300 
                     border border-white/20 shadow-xl hover:shadow-2xl"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-blue mb-2">
                {count}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {label}
              </h3>
              <p className="text-gray-600 mb-4">
                {description}
              </p>
              
              {/* Visual Preview */}
              <div className="flex justify-center">
                <LayoutPreview count={count} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-600">
        <p>✨ No signup required • Instant download • Complete privacy</p>
      </div>
    </div>
  )
}

// Layout Preview Component
const LayoutPreview = ({ count }: { count: LayoutType }) => {
  const getGridClass = () => {
    switch (count) {
      case 3: return 'grid-cols-3'
      case 5: return 'grid-cols-3' // 2+1+2 layout
      case 7: return 'grid-cols-3' // 3+1+3 layout
      case 9: return 'grid-cols-3'
      default: return 'grid-cols-3'
    }
  }

  const getBoxes = () => {
    const boxes = []
    for (let i = 0; i < count; i++) {
      boxes.push(
        <div
          key={i}
          className="w-6 h-6 bg-slate-blue/30 rounded border border-slate-blue/50"
        />
      )
    }
    return boxes
  }

  return (
    <div className={`grid ${getGridClass()} gap-1 p-2`}>
      {getBoxes()}
    </div>
  )
}

export default LayoutSelector