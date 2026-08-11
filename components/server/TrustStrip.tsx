import { Check } from 'lucide-react'

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Sen Tech promises">
      {['Thoughtful design', 'Printed on premium stock', 'Made to be kept'].map((item, index) => (
        <div key={item} className={index === 2 ? 'trust-item--hide-mobile' : ''}><Check aria-hidden="true" />{item}</div>
      ))}
    </section>
  )
}
