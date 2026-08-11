import { ArrowUpRight } from 'lucide-react'
import CalendarVisual from '@/components/server/CalendarVisual'
import SectionIntro from '@/components/server/SectionIntro'
import { categories } from '@/components/server/data'

export default function Categories() {
  return (
    <section className="section section--categories" id="categories">
      <SectionIntro eyebrow="Find your format" title="A place for everything." action="Browse all" />
      <div className="category-grid">
        {categories.map((category) => (
          <a href="#shop" className={`category-card ${category.tone}`} key={category.title}>
            <div className="category-visual">
              <CalendarVisual tone={category.tone} mark={category.visual === 'family' ? 'AUG' : '2025'} compact />
            </div>
            <div className="category-meta">
              <div><h3>{category.title}</h3><p>{category.caption}</p></div>
              <span><ArrowUpRight /></span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
