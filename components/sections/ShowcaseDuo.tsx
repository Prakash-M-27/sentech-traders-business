'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import Tilt3D from '@/components/motion/Tilt3D'
import MagneticButton from '@/components/motion/MagneticButton'

export default function ShowcaseDuo() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Opposing parallax movement on scroll
  const calOneY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const calTwoY = useTransform(scrollYProgress, [0, 1], [-30, 60])
  const textY = useTransform(scrollYProgress, [0, 1], [25, -25])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [70, -70])

  return (
    <section
      ref={containerRef}
      className="py-28 lg:py-40 bg-[#FFFFFF] relative overflow-hidden border-b border-[#E2DDD3]"
    >
      {/* Giant Atmospheric Background Watermark Typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.032] z-0 flex justify-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          ARTISANAL
        </span>
      </motion.div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Asymmetrical Overlapping Calendar Showcase (Left/Center) */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative min-h-[520px] sm:min-h-[640px] flex items-center justify-center"
          >
            {/* Ambient Shadow Layer */}
            <div className="absolute inset-0 bg-gradient-radial from-[#DCE8DE]/50 to-transparent blur-3xl -z-10" />

            {/* Calendar #1 — Larger primary portrait */}
            <motion.div
              style={{ y: calOneY }}
              className="absolute left-0 sm:left-4 top-4 w-[75%] sm:w-[65%] z-20"
            >
              <Tilt3D maxTiltX={4} maxTiltY={4}>
                <div
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white group cursor-pointer"
                  data-cursor="view"
                  data-cursor-text="EDITION 01"
                >
                  <Image
                    src="/cal_1.jpeg"
                    alt="Sen Tech Daily Calendar Edition 01"
                    fill
                    sizes="(max-width: 768px) 80vw, 420px"
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono font-bold text-[#121413] border border-[#E2DDD3] shadow-sm">
                    SAGE EDIT • 280 GSM
                  </div>
                </div>
              </Tilt3D>
            </motion.div>

            {/* Calendar #2 — Offset lower/right with tactile overlap */}
            <motion.div
              style={{ y: calTwoY }}
              className="absolute right-0 sm:right-6 bottom-4 w-[65%] sm:w-[55%] z-30"
            >
              <Tilt3D maxTiltX={4} maxTiltY={4}>
                <div
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white group cursor-pointer"
                  data-cursor="view"
                  data-cursor-text="EDITION 02"
                >
                  <Image
                    src="/cal_2.jpeg"
                    alt="Sen Tech Daily Calendar Edition 02"
                    fill
                    sizes="(max-width: 768px) 70vw, 360px"
                    className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-[#121413]/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-semibold text-white border border-white/20 shadow-md">
                    WARM OCHRE • WALL
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          </motion.div>

          {/* Editorial Storytelling Text (Right) */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C07D38]" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#C07D38]">
                Premium Wall Companion
              </span>
            </div>

            <h2 className="font-display font-extrabold text-editorial-lg text-[#121413] tracking-tight uppercase leading-[0.95]">
              Designed for <br />
              <span className="font-serif font-normal italic text-[#1B4332] capitalize">
                Your Daily Space.
              </span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-[#4A4D49] leading-relaxed font-sans font-normal">
              More than just a calendar — it is a luxury statement piece crafted to make your wall look and feel extraordinary every single day.
            </p>

            {/* Editorial Feature Highlights */}
            <div className="mt-8 space-y-3.5 border-t border-[#E2DDD3] pt-6">
              {[
                'Easy on your eyes — crystal clear and glare-free in any lighting',
                'Built to last — ultra-thick premium leaves with solid wall mount',
                'Aesthetic color tones — effortlessly complements any room or office wall',
              ].map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1B4332] stroke-[2.2] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#121413] font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <MagneticButton as="a" href="#collection" data-cursor="cta">
                <span className="btn-wipe inline-flex items-center gap-3 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-300 shadow-md cursor-pointer">
                  <span>View All Editions</span>
                  <ArrowUpRight className="w-4 h-4 text-white stroke-[2.2]" />
                </span>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
