import Header from '@/components/client/Header'
import Hero from '@/components/server/Hero'
import TrustStrip from '@/components/server/TrustStrip'
import ProductGrid from '@/components/client/ProductGrid'
import EnquirySection from '@/components/client/EnquirySection'
import WhySection from '@/components/server/WhySection'
import Gallery from '@/components/server/Gallery'
import Footer from '@/components/server/Footer'
import SectionIntro from '@/components/server/SectionIntro'
import Reveal from '@/components/client/Reveal'

export default function Page() {
  return (
    <main>
      <Header />

      <Reveal><Hero /></Reveal>

      <Reveal delay={0.1}><TrustStrip /></Reveal>

      <Reveal delay={0.15}>
        <section className="section" id="shop">
          <SectionIntro eyebrow="The edit" title="A year worth looking forward to." copy="Our best-loved calendars, made to look beautiful on your wall." />
          <ProductGrid />
        </section>
      </Reveal>

      <Reveal delay={0.2}><WhySection /></Reveal>

      <Reveal delay={0.15}><Gallery /></Reveal>

      <Reveal delay={0.2}><EnquirySection /></Reveal>

      <Footer />
    </main>
  )
}
