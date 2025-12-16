import type { Filter } from '../types'

export const FILTERS: Filter[] = [
  {
    id: 'none',
    name: 'Original',
    description: 'No filter',
    cssFilter: 'none'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Classic vintage look',
    cssFilter: 'sepia(0.5) contrast(1.2) brightness(1.1) saturate(0.8)'
  },
  {
    id: '80s',
    name: '80s Vibe',
    description: 'Neon era nostalgia',
    cssFilter: 'contrast(1.3) brightness(1.2) saturate(1.4) hue-rotate(10deg)'
  },
  {
    id: '90s',
    name: '90s Cool',
    description: 'Grunge era aesthetic',
    cssFilter: 'contrast(1.1) brightness(0.9) saturate(0.7) sepia(0.2)'
  },
  {
    id: 'sepia',
    name: 'Sepia Tone',
    description: 'Classic brown tint',
    cssFilter: 'sepia(1) contrast(1.1) brightness(1.1)'
  },
  {
    id: 'blackwhite',
    name: 'Black & White',
    description: 'Timeless monochrome',
    cssFilter: 'grayscale(1) contrast(1.2) brightness(1.1)'
  }
]