'use client'

import { motion } from 'framer-motion'

export default function BrandMarquee() {
  const phrases1 = [
    'DESIGNED WITH INTENTION',
    'MADE FOR EVERY DAY',
    'PLAN BEAUTIFULLY',
    'ARCHIVAL COTTON STOCK',
    'CREATE BETTER DAYS',
    'SOLID HARDWOOD BASES',
  ]

  const phrases2 = [
    'ARTISANAL BRASS BINDING',
    'TIMELESS DESK OBJECTS',
    'TACTILE CRAFTSMANSHIP',
    'BESPOKE CORPORATE EDITIONS',
    'ZERO BLEED INK ABSORPTION',
    'HAND-FINISHED IN TAMIL NADU',
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-10 sm:py-14 border-y border-[#E2DDD3] bg-[#F4EFE6] overflow-hidden relative select-none"
    >
      {/* Track 1 — Moves Left */}
      <div className="flex whitespace-nowrap overflow-hidden py-1.5">
        <motion.div
          animate={{ x: [0, '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 32,
            ease: 'linear',
          }}
          className="flex items-center gap-10 sm:gap-14 font-serif text-xl sm:text-3xl text-[#121413] font-normal tracking-tight uppercase shrink-0"
        >
          {phrases1.concat(phrases1).map((phrase, i) => (
            <div key={i} className="flex items-center gap-10 sm:gap-14">
              <span>{phrase}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] shrink-0 shadow-sm" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Track 2 — Moves Right */}
      <div className="flex whitespace-nowrap overflow-hidden py-1.5 mt-2 sm:mt-3">
        <motion.div
          animate={{ x: ['-50%', 0] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 36,
            ease: 'linear',
          }}
          className="flex items-center gap-10 sm:gap-14 font-sans text-xs sm:text-sm font-bold tracking-[0.25em] text-[#575A54] uppercase shrink-0"
        >
          {phrases2.concat(phrases2).map((phrase, i) => (
            <div key={i} className="flex items-center gap-10 sm:gap-14">
              <span>{phrase}</span>
              <span className="w-2 h-2 rounded-full bg-[#C07D38] shrink-0 shadow-sm" />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
