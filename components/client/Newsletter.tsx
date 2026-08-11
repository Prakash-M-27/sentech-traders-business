'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">The Sunday note</p>
        <h2>A little good stuff,<br />in your inbox.</h2>
      </div>
      <div>
        <p>New collections, practical inspiration, and the occasional reason to put the kettle on.</p>
        <form onSubmit={(event) => { event.preventDefault(); setSubscribed(true) }}>
          {subscribed ? (
            <div className="subscribed"><Check /> You are on the list. Welcome in.</div>
          ) : (
            <div className="email-field">
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" required aria-label="Email address" />
              <button aria-label="Subscribe"><ArrowRight /></button>
            </div>
          )}
          <small>By subscribing, you agree to our privacy policy.</small>
        </form>
      </div>
    </section>
  )
}
