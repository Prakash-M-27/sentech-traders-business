import { ArrowRight, Check } from 'lucide-react'

export default function WhySection() {
  return (
    <section className="section why-section" id="about">
      <div className="why-image">
        <div className="why-card">
          <span>01</span>
          <strong>Good design<br />is useful.</strong>
          <small>Everything has a place.</small>
        </div>
        <div className="why-stamp">Made<br />to keep</div>
      </div>
      <div className="why-copy">
        <p className="eyebrow">Why Sen Tech</p>
        <h2>Made for real life, not just pretty pictures.</h2>
        <p>We believe the things you use every day should bring you joy. So we obsess over the paper, the details, and the small moments that turn a calendar into a keepsake.</p>
        <div className="reason-list">
          {['Rich, true-to-life color', 'Thick, archival paper stock', 'Thoughtful details, zero waste', 'Packed with a little extra care'].map((reason) => (
            <div key={reason}><Check />{reason}</div>
          ))}
        </div>
        <a className="text-link" href="#top">Read our story <ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
