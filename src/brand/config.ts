export type BrandColors = {
  primaryFrom: string
  primaryTo: string
  primaryHoverFrom: string
  primaryHoverTo: string
  backgroundFrom: string
  backgroundVia: string
  backgroundTo: string
}

export type BrandConfig = {
  name: string
  logoSrc: string // Path under public/
  colors: BrandColors
}

// Update these values to rebrand quickly.
export const brand: BrandConfig = {
  name: 'EduNova',
  logoSrc: '/logo.svg',
  colors: {
    primaryFrom: 'from-teal-600',
    primaryTo: 'to-emerald-600',
    primaryHoverFrom: 'hover:from-teal-700',
    primaryHoverTo: 'hover:to-emerald-700',
    backgroundFrom: 'from-teal-900',
    backgroundVia: 'via-cyan-900',
    backgroundTo: 'to-emerald-900',
  },
}

export default brand


