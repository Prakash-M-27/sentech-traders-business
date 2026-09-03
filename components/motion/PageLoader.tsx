'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      setLoading(false)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('page-card-start-fly'))
        window.dispatchEvent(new CustomEvent('page-loaded'))
      }
      return
    }

    // Smooth counter animation 0 to 100
    const startTime = Date.now()
    const duration = 850

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100))
      setCount(progress)

      if (elapsed >= duration) {
        clearInterval(interval)
        setTimeout(() => {
          setLoading(false)
          // As curtains slide up and expose the hero section, trigger fly-in visibly!
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('page-card-start-fly'))
            }
          }, 450)
        }, 80)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const slideTransition = {
    duration: 0.75,
    ease: [0.76, 0, 0.24, 1] as const,
  }

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Layer 3: Deep Forest Emerald Base Curtain Layer */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ ...slideTransition, delay: 0.2 }}
            onAnimationComplete={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('page-card-start-fly'))
                window.dispatchEvent(new CustomEvent('page-loaded'))
              }
            }}
            className="absolute inset-0 bg-[#122F23] z-10"
          />

          {/* Layer 2: Warm Ochre Gold Accent Curtain Layer */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ ...slideTransition, delay: 0.1 }}
            className="absolute inset-0 bg-[#C07D38] z-20"
          />

          {/* Layer 1: Primary Paper White Curtain with Brand Identity */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ ...slideTransition, delay: 0 }}
            className="absolute inset-0 bg-[#FCFBF8] z-30 flex flex-col items-center justify-between py-10 sm:py-12 px-6 pointer-events-auto"
          >
            {/* Top Micro Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-5xl flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#737770]"
            >
              <span>SEN TECH TRADERS</span>
              <span>2027 EDITION</span>
            </motion.div>

            {/* Center Logo & Brand Identity */}
            <div className="flex flex-col items-center max-w-sm w-full">
              {/* Logo with mask slide-up */}
              <div className="overflow-hidden mb-4">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3.5"
                >
                  <div className="relative w-12 h-12">
                    <Image
                      src="/sentech_logo_180x180.png"
                      alt="Sen Tech Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span className="font-serif text-3xl font-bold tracking-tight text-[#121413]">
                    SEN TECH
                  </span>
                </motion.div>
              </div>

              {/* Tagline */}
              <div className="overflow-hidden mb-8">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-sans text-xs uppercase tracking-[0.3em] text-[#737770] font-medium"
                >
                  Artisanal Calendars & Objects
                </motion.span>
              </div>

              {/* Expanding Progress Bar */}
              <div className="w-56 h-[2px] bg-[#E2DDD3] rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-[#1B4332] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: count / 100 }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Percentage Counter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 font-mono text-[11px] font-bold text-[#1B4332]"
              >
                {count}%
              </motion.div>
            </div>

            {/* Bottom Footer Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="text-[10px] font-sans text-[#737770] uppercase tracking-[0.25em]"
            >
              Mindful rhythm for everyday spaces
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

