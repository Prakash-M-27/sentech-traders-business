'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Frame, Star, ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import { brandTestimonials } from '@/lib/products'

export default function TestimonialsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
      )
    }
  }, [])

  return (
    <section
      id="testimonials"
      className="pt-24 lg:pt-32 pb-14 lg:pb-20 bg-[#F8F6F0] relative overflow-hidden border-b border-[#E2DDD3]"
    >
      {/* Giant Atmospheric Background Watermark Typography */}
      <div
        className="absolute top-1/3 -right-10 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          COMMUNITY
        </span>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Properly Aligned Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20 pb-8 border-b border-[#E2DDD3]">
          {/* Left Column: Kicker & Headline */}
          <div>
            {/* Animated Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#C07D38] animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#C07D38] bg-[#FBF4EC] border border-[#F0DFCD] px-3.5 py-1 rounded-full shadow-sm">
                From Our Community
              </span>
            </motion.div>

            {/* Masked Headline Reveal */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-editorial-lg text-[#121413] tracking-tight uppercase leading-[0.95]"
              >
                Kept in <br />
                <span className="font-serif font-normal italic text-[#1B4332] capitalize">
                  Inspiring spaces.
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Right Column: Narrative Description & Drag Indicator */}
          <div className="flex flex-col items-start md:items-end gap-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md text-sm sm:text-base text-[#4A4D49] leading-relaxed font-sans font-normal md:text-right"
            >
              Hanging proudly on executive walls, creative studios, and reception lobbies across India.
            </motion.p>

            {/* Drag Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-[#737770] font-semibold bg-white px-4 py-2 rounded-full border border-[#E2DDD3] shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
              <span>Drag horizontally to explore</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#1B4332] animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Draggable Horizontal Carousel Container */}
      <div
        ref={carouselRef}
        className="cursor-grab active:cursor-grabbing overflow-hidden pl-5 sm:pl-8 lg:pl-12 max-w-full"
        data-cursor="drag"
        data-cursor-text="DRAG →"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width - 40 }}
          whileTap={{ cursor: 'grabbing' }}
          className="flex gap-6 sm:gap-8 pb-10"
        >
          {brandTestimonials.map((item, idx) => (
            <motion.div
              key={idx}
              className="w-[85vw] sm:w-[500px] lg:w-[540px] shrink-0 bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#E2DDD3] hover:border-[#1B4332] shadow-md hover:shadow-2xl transition-all duration-400 flex flex-col justify-between select-none group"
            >
              {/* Header with Star Rating & Wall Placement Tag */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#C07D38]">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#1B4332] bg-[#EBF2EC] border border-[#DCE8DE] px-3.5 py-1 rounded-full">
                  <Frame className="w-3 h-3 text-[#1B4332]" />
                  <span>Wall Mounted</span>
                </span>
              </div>

              {/* Oversized Quotation Mark */}
              <div className="font-serif text-5xl text-[#1B4332]/25 leading-none mb-3">
                “
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#121413] font-normal leading-snug">
                {item.quote}
              </blockquote>

              <div className="pt-8 mt-8 border-t border-[#ECE7DE] flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#121413] group-hover:text-[#1B4332] transition-colors">
                    {item.author}
                  </h4>
                  <p className="text-xs text-[#737770] font-sans mt-0.5 font-medium">
                    {item.role}, {item.company}
                  </p>
                </div>

                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737770] bg-[#F7F4EC] border border-[#E2DDD3] px-3.5 py-1 rounded-full">
                  {item.location}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
