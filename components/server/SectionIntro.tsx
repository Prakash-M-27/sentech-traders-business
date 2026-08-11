import { ArrowRight } from 'lucide-react'

export default function SectionIntro({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy?: string; action?: string }) {
  return (
    <div className="section-intro">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy && <p className="section-copy">{copy}</p>}
      {action && <button className="text-link">{action}<ArrowRight aria-hidden="true" /></button>}
    </div>
  )
}
