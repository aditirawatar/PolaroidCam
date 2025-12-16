import type { FilterType } from '../../types'
import { FILTERS } from '../../utils/filters'

interface Props {
  selectedFilter: FilterType
  onFilterSelect: (filter: FilterType) => void
}

const FilterPanel = ({ selectedFilter, onFilterSelect }: Props) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mt-6 w-full max-w-2xl shadow-md">
      <h3 className="text-lg font-semibold text-pink-700 mb-4 text-center">
        Choose Your Vibe ✨
      </h3>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterSelect(filter.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-lg text-center transition-all duration-300 text-sm
              ${selectedFilter === filter.id 
                ? 'bg-gradient-to-br from-pink-700 to-rose-600 text-white shadow-lg scale-105' 
                : 'bg-white/40 hover:bg-white/60 text-gray-800'
              }
            `}
          >
            <div className="font-medium">{filter.name}</div>
            <div className="text-xs opacity-75 mt-1">{filter.description}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterPanel
