import SmoothScroll from '@/components/motion/SmoothScroll'
import Cursor from '@/components/motion/Cursor'
import ScrollProgress from '@/components/motion/ScrollProgress'
import PageLoader from '@/components/motion/PageLoader'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import BrandMarquee from '@/components/sections/BrandMarquee'
import ScrollStory from '@/components/sections/ScrollStory'
import ShowcaseDuo from '@/components/sections/ShowcaseDuo'
import ProductCollection from '@/components/sections/ProductCollection'
import BrandPhilosophy from '@/components/sections/BrandPhilosophy'
import CraftsmanshipBento from '@/components/sections/CraftsmanshipBento'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import EnquirySection from '@/components/sections/EnquirySection'
import Footer from '@/components/sections/Footer'

export default function Page() {
  return (
    <SmoothScroll>
      <PageLoader />
      <Cursor />
      <ScrollProgress />
      <Header />

      <main className="relative bg-paper-white overflow-hidden">
        {/* 1. Showpiece Hero Section */}
        <Hero />

        {/* 2. Infinite Editorial Brand Marquee */}
        <BrandMarquee />

        {/* 3. Sticky Scroll Feature Presentation */}
        <ScrollStory />

        {/* 4. Asymmetrical Calendar Duo Showcase */}
        <ShowcaseDuo />

        {/* 5. Curated Product Collection & Quick-View Modal */}
        <ProductCollection />

        {/* 7. Cinematic Brand Story & Word-by-Word Scroll Reveal */}
        <BrandPhilosophy />

        {/* 8. Craftsmanship Bento & Interactive Cursor Image Trail */}
        <CraftsmanshipBento />

        {/* 9. Draggable Community Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* 10. Luxury Underline Enquiry Form & WhatsApp Handoff */}
        <EnquirySection />
      </main>

      {/* 11. Oversized Masked Editorial Footer */}
      <Footer />
    </SmoothScroll>
  )
}
