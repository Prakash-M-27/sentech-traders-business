import SectionIntro from '@/components/server/SectionIntro'

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <SectionIntro eyebrow="From our community" title="Good things, in their natural habitat." action="Follow along @sen_tech" />
      <div className="gallery-grid">
        <div className="gallery-tile gallery-tile--tall"><div className="gallery-photo photo-one" /><span>@thefrenchfolk</span></div>
        <div className="gallery-tile"><div className="gallery-photo photo-two" /><span>@studiojune</span></div>
        <div className="gallery-tile"><div className="gallery-photo photo-three" /><span>@alittlemoremagic</span></div>
        <div className="gallery-tile gallery-tile--wide"><div className="gallery-photo photo-four" /><span>@homebodyclub</span></div>
      </div>
    </section>
  )
}
