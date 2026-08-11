import { ArrowRight, Sparkles, Star } from 'lucide-react'
import CalendarVisual from '@/components/server/CalendarVisual'

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
      <div className="hero-art" aria-label="A botanical calendar and desk calendar displayed on a table" role="img">
        <div className="art-sun" /><div className="art-label">New collection<br /><strong>25 / 26</strong></div>
        <div className="hero-calendar-back"><CalendarVisual tone="sky" mark="JUN" /></div>
        <div className="hero-calendar-front"><CalendarVisual tone="sage" mark="JUL" /></div>
        <div className="hero-sticker">The<br /><strong>good<br />stuff</strong></div>
        <div className="hero-pencil" />
      </div>
    </section>
  )
}
