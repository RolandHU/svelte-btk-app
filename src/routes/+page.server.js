import path from 'path'
import fs from 'fs'

/** @type {import('./$types').PageServerLoad} */
export function load() {
  const file = JSON.parse(fs.readFileSync(path.join(process.cwd() + '/BTK.json')))
  const categories = []

  file.map(f => {
    if (categories.includes(f.Category)) return
    categories.push(f.Category)
  })

  return {
    elems: {
      penalties: file,
      categories: categories
    }
  }
}