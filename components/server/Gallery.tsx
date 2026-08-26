import SectionIntro from '@/components/server/SectionIntro'

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <SectionIntro eyebrow="From our community" title="Good things, in their natural habitat." action="Follow along @sen_tech" />
      <h3 className="gallery-heading">Crafted Wooden Frames Are Available Now</h3>
      <div className="gallery-photo-full">
        <img src="/new.jpeg" alt="Crafted wooden frames" className="gallery-photo-img" />
      </div>
    </section>
  )
}
