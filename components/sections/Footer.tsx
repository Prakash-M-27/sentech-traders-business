'use client'

import { motion } from 'framer-motion'
import { ArrowUp, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#111614] text-[#E5EBE7] pt-24 pb-12 border-t border-[#24302C] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Multi-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#24302C]">
          {/* Brand Col (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#24302C] bg-white">
                <Image
                  src="/sentech_logo_180x180.png"
                  alt="Sen Tech Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-tight text-white leading-tight">
                  SEN TECH
                </span>
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#8E9E95] font-medium">
                  Import | Export
                </span>
              </div>
            </div>
            <p className="text-sm text-[#8E9E95] leading-relaxed max-w-sm font-sans">
              Makers of artisanal daily calendars, studio planners, and solid hardwood desk mounts.
              Designed with quiet intention in Trichy, Tamil Nadu.
            </p>
            <div className="pt-2 text-xs font-mono text-[#8E9E95] flex items-center gap-3">
              <span>All-India Shipping</span> • <span>GST Registered</span>
            </div>
          </div>

          {/* Navigation Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E9E95] block font-bold">
              Collections
            </span>
            <ul className="space-y-2 text-sm font-sans font-medium text-[#C2CFC8]">
              <li>
                <a href="#collection" className="animated-underline hover:text-white transition-colors">
                  Daily Calendars
                </a>
              </li>
              <li>
                <a href="#collection" className="animated-underline hover:text-white transition-colors">
                  Studio Planners
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="animated-underline hover:text-white transition-colors">
                  Teakwood Mounts
                </a>
              </li>
              <li>
                <a href="#enquiry" className="animated-underline hover:text-white transition-colors">
                  Bespoke Corporate
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Links (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E9E95] block font-bold">
              Explore
            </span>
            <ul className="space-y-2 text-sm font-sans font-medium text-[#C2CFC8]">
              <li>
                <a href="#collection" className="animated-underline hover:text-white transition-colors">
                  Calendars
                </a>
              </li>
              <li>
                <a href="#features" className="animated-underline hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="animated-underline hover:text-white transition-colors">
                  Quality & Materials
                </a>
              </li>
              <li>
                <a href="#story" className="animated-underline hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="animated-underline hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Info (Span 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8E9E95] block font-bold">
              Trichy Studio
            </span>
            <address className="not-italic text-sm text-[#C2CFC8] space-y-2.5 font-sans">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                <span>
                  1, Thendral Nagar South, Olaiyur Main Road, K.K.Nagar, Trichy 620021, Tamil Nadu
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <a href="tel:8608059455" className="hover:text-white font-bold text-white transition-colors">
                  +91 86080 59455
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Huge Oversized Masked Typography: SEN TECH */}
        <div className="py-16 sm:py-24 overflow-hidden select-none">
          <motion.div
            initial={{ y: '70%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-center"
          >
            <h2 className="font-serif text-[18vw] leading-none tracking-[-0.04em] text-[#E5EBE7]/90 font-normal hover:text-[#2D6A4F] transition-colors duration-700">
              SEN TECH
            </h2>
          </motion.div>
        </div>

        {/* Footer Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-[#24302C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E9E95]">
          <p>© {new Date().getFullYear()} SEN TECH. All rights reserved. Made for good days.</p>

          {/* Back To Top Action */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white font-bold uppercase tracking-wider hover:text-[#2D6A4F] transition-colors p-2"
            aria-label="Scroll back to top"
            data-cursor="hover"
          >
            <span>Back to top</span>
            <div className="w-6 h-6 rounded-full bg-[#18201D] border border-[#24302C] flex items-center justify-center text-[#2D6A4F]">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </motion.footer>
  )
}
