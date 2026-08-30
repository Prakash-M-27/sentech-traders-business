'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/motion/MagneticButton'

export default function StickyProductDeconstruct() {
  const targetRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // Step 1: Calendar entrance scale & opacity
  const calScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.85, 1, 1.02, 0.98, 1])
  const calRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [4, -2, 1, 0])
  const calX = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], [40, 0, -30, 0])

  // Step 3: Detail callouts opacity & scale
  const callout1Opacity = useTransform(scrollYProgress, [0.25, 0.4, 0.8, 0.95], [0, 1, 1, 0])
  const callout2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.8, 0.95], [0, 1, 1, 0])
  const callout3Opacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8, 0.95], [0, 1, 1, 0])

  // Step 4: Secondary wooden mount layer entrance
  const secondaryMountY = useTransform(scrollYProgress, [0.4, 0.65, 0.9], [120, 0, -10])
  const secondaryMountOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])

  // Step 5: Active Narrative Headline Switch
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.38], [1, 1, 0])
  const stage2Opacity = useTransform(scrollYProgress, [0.38, 0.45, 0.7, 0.76], [0, 1, 1, 0])
  const stage3Opacity = useTransform(scrollYProgress, [0.76, 0.85, 1], [0, 1, 1])

  return (
    <div ref={targetRef} className="relative h-[280vh] bg-[#FAF7F2]">
      {/* Sticky Viewport Stage (100vh) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-12 px-5 sm:px-8 lg:px-12">
        {/* Top Minimal Stage Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-pulse" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B4332]">
              Interactive Deconstruction
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#737770] uppercase font-medium">
              Scroll Story
            </span>
            <div className="w-24 h-1.5 bg-[#E2DDD3] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#1B4332] origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
        </div>

        {/* Center Stage: Interactive Visual & Storytelling Overlay */}
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          {/* Left Text Narrative (Transitions with Scroll) */}
          <div className="lg:col-span-5 relative min-h-[240px]">
            {/* Stage 1: Entrance */}
            <motion.div
              style={{ opacity: stage1Opacity }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="text-xs font-mono font-bold text-[#1B4332] uppercase tracking-widest">
                Phase 01 • Form & Weight
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#121413] tracking-tight mt-2">
                Pure Archival Foundation.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4A4D49] leading-relaxed">
                Every calendar leaf begins with 280 GSM heavyweight cotton stock,
                selected for its tactile warmth and zero-bleed ink absorption.
              </p>
            </motion.div>

            {/* Stage 2: Details & Hot Foil */}
            <motion.div
              style={{ opacity: stage2Opacity }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            >
              <span className="text-xs font-mono font-bold text-[#C07D38] uppercase tracking-widest">
                Phase 02 • Precision Detailing
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#121413] tracking-tight mt-2">
                Tactile Gold Stamping & Micro-Perforations.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4A4D49] leading-relaxed">
                Hand-pressed gold foil highlights accompany micro-tooth perforation lines,
                ensuring every day separates effortlessly with razor-sharp clean edges.
              </p>
            </motion.div>

            {/* Stage 3: Teak Base & Bespoke */}
            <motion.div
              style={{ opacity: stage3Opacity }}
              className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
            >
              <span className="text-xs font-mono font-bold text-[#1B4332] uppercase tracking-widest">
                Phase 03 • Heirloom Mount
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#121413] tracking-tight mt-2">
                Crafted Solid Hardwood Mount.
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#4A4D49] leading-relaxed mb-5">
                Precision-milled teakwood and seasoned oak bases turn your calendar into
                a permanent architectural fixture. Custom brand logo engraving available for corporate partners.
              </p>
              <div>
                <MagneticButton as="a" href="#enquiry" data-cursor="cta">
                  <span className="btn-wipe inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-md">
                    <span>Order Custom Edition</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Stage: Centered Exploded Tactile Calendar Object */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            {/* Main Interactive Product Sheet */}
            <motion.div
              style={{
                scale: calScale,
                rotate: calRotate,
                x: calX,
              }}
              className="relative w-64 sm:w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#E2DDD3] bg-white z-20"
              data-cursor="view"
              data-cursor-text="EXPLORE"
            >
              <Image
                src="/cal_3.jpeg"
                alt="Calendar exploded view"
                fill
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-cover object-center"
              />

              {/* Callout Marker 1: Top Brass Loop */}
              <motion.div
                style={{ opacity: callout1Opacity }}
                className="absolute top-6 left-6 bg-[#121413]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-[10px] font-mono shadow-xl flex items-center gap-2.5 pointer-events-none"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5A024] animate-ping" />
                <span className="font-semibold">360° Brass Coil Binding</span>
              </motion.div>

              {/* Callout Marker 2: Micro-perforation */}
              <motion.div
                style={{ opacity: callout2Opacity }}
                className="absolute top-1/3 right-4 bg-[#121413]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-[10px] font-mono shadow-xl flex items-center gap-2.5 pointer-events-none"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-ping" />
                <span className="font-semibold">Micro-tooth Tear Leaf</span>
              </motion.div>

              {/* Callout Marker 3: Archival Stock */}
              <motion.div
                style={{ opacity: callout3Opacity }}
                className="absolute bottom-6 left-6 bg-[#121413]/95 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/20 text-[10px] font-mono shadow-xl flex items-center gap-2.5 pointer-events-none"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCE8DE] animate-ping" />
                <span className="font-semibold">280 GSM Cotton Stock</span>
              </motion.div>
            </motion.div>

            {/* Secondary Teakwood Mount Docking In */}
            <motion.div
              style={{
                y: secondaryMountY,
                opacity: secondaryMountOpacity,
              }}
              className="absolute -bottom-6 -right-2 sm:right-6 w-48 sm:w-60 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white bg-white z-30 pointer-events-none"
            >
              <Image
                src="/new.jpeg"
                alt="Teakwood dock base"
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121413]/80 via-transparent to-transparent flex items-end p-3.5">
                <span className="text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                  Solid Teakwood Mount
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-[10px] font-mono text-[#737770] uppercase tracking-widest pt-2 z-10 font-medium">
          <span>Continuous Scroll Experience</span>
          <span>SEN TECH CRAFT LAB</span>
        </div>
      </div>
    </div>
  )
}
