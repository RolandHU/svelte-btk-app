import { penalties } from './BTK'

export function load() {
  const categories = []

  penalties.map(p => {
    if (categories.includes(p.Category)) return
    categories.push(p.Category)
  })

  return {
    elems: {
      penalties: penalties,
      categories: categories
    }
  }
}