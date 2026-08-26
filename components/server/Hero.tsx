import { ArrowRight, Sparkles, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="kicker"><Sparkles aria-hidden="true" /> Made for the days ahead</div>
        <h1>Make room for <em>good days.</em></h1>
        <p>Beautiful calendars and paper goods designed to bring a little more intention to every day.</p>
        <div className="hero-actions"><a className="button button--dark" href="#shop">Shop the collection <ArrowRight aria-hidden="true" /></a></div>
        <div className="hero-note"><span className="avatar-stack"><i /><i /><i /></span><span>Loved by 100+ everyday planners</span><span className="stars"><Star fill="currentColor" /> 4.9</span></div>
      </div>
      <div className="hero-art" aria-label="Sen Tech calendar header" role="img">
        <img src="/header_image.png" alt="Sen Tech calendars" className="hero-art-img" />
      </div>
    </section>
  )
}
