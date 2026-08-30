'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  Star,
  X,
  CheckCircle2,
  Award
} from 'lucide-react'
import Image from 'next/image'
import Tilt3D from '@/components/motion/Tilt3D'
import MagneticButton from '@/components/motion/MagneticButton'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<'cal1' | 'cal2' | null>(null)
  const [activeTab, setActiveTab] = useState<'both' | 'cal1' | 'cal2'>('both')
  const [inspectImage, setInspectImage] = useState<{ src: string; title: string; edition: string } | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax scroll layers
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const cal1ScrollY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const cal2ScrollY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-[96vh] lg:min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden flex flex-col justify-between bg-[#FCFBF8]"
    >
      {/* Ambient Atmospheric Radial Gradient Orbs with slow breathing glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute top-1/4 right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-full blur-[130px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
        className="absolute top-1/3 right-[30%] w-[450px] h-[450px] bg-gradient-to-tr from-[#C07D38] to-[#E5A024] rounded-full blur-[110px] pointer-events-none -z-10"
      />

      {/* Decorative Atmospheric Background Typography */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-14 right-0 left-0 pointer-events-none select-none overflow-hidden opacity-[0.032] z-0 flex justify-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[20vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          SEN TECH 2026
        </span>
      </motion.div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (col-span-5 for ample breathing room) */}
          <motion.div
            style={{ y: heroTextY, opacity }}
            className="lg:col-span-5 z-20"
          >
            {/* Micro Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF2EC] border border-[#DCE8DE] mb-5 sm:mb-6 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#1B4332] animate-pulse" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B4332]">
                Artisanal 2027 Collection
              </span>
            </motion.div>

            {/* Oversized Headline */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: '130%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-[3.2rem] sm:text-[4.2rem] lg:text-[4.8rem] leading-[0.96] text-[#121413] tracking-[-0.04em] uppercase"
              >
                Make Room
              </motion.h1>
            </div>

            <div className="overflow-hidden flex items-baseline gap-3 sm:gap-4 flex-wrap mt-1 py-1">
              <motion.span
                initial={{ y: '130%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans font-normal text-3xl sm:text-4xl lg:text-5xl text-[#737770] italic tracking-normal"
              >
                for
              </motion.span>
              <motion.h1
                initial={{ y: '130%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.95, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-normal text-[3.2rem] sm:text-[4.2rem] lg:text-[4.8rem] leading-[0.96] text-[#1B4332] tracking-[-0.03em] capitalize"
              >
                Good Days.
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-lg text-base sm:text-lg text-[#4A4D49] leading-relaxed font-sans font-normal"
            >
              Tactile daily calendars and archival paper goods designed to bring
              clarity, rhythm, and mindful craftsmanship to your desk every single day.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {[
                { text: 'Solid Teak Mount', icon: Award },
                { text: 'Archival 300 GSM Paper', icon: CheckCircle2 },
                { text: 'Tactile Gold Foil', icon: Sparkles },
              ].map((badge) => {
                const Icon = badge.icon
                return (
                  <span
                    key={badge.text}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#E2DDD3] text-[11px] font-medium text-[#4A4D49] shadow-xs hover:border-[#1B4332]/40 transition-colors"
                  >
                    <Icon className="w-3 h-3 text-[#1B4332]" />
                    {badge.text}
                  </span>
                )
              })}
            </motion.div>

            {/* CTA Buttons & Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#collection"
                data-cursor="cta"
              >
                <span className="btn-wipe inline-flex items-center gap-3 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 sm:px-8 py-3.5 rounded-full shadow-lg shadow-[#1B4332]/15 hover:shadow-xl transition-all duration-300">
                  <span>Explore The Edit</span>
                  <ArrowUpRight className="w-4 h-4 text-white stroke-[2.5]" />
                </span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#enquiry"
                data-cursor="hover"
              >
                <span className="inline-flex items-center gap-2 bg-white hover:bg-[#F2EFE8] text-[#121413] border border-[#E2DDD3] text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-6 py-3.5 rounded-full transition-colors duration-300 shadow-xs">
                  <span>Custom Orders</span>
                </span>
              </MagneticButton>

              {/* Loved by Rating */}
              <div className="flex items-center gap-3 pl-2 sm:pl-3 py-1.5 border-l border-[#E2DDD3]">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-[#EBF2EC] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#1B4332] shadow-xs">
                    S
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FAF4E3] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#C07D38] shadow-xs">
                    T
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#EAF4F7] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#121413] shadow-xs">
                    27
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#E5A024] text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E5A024] text-[#E5A024]" />
                    ))}
                    <span className="text-[#121413] font-bold text-[11px] ml-1">4.9/5</span>
                  </div>
                  <span className="text-[10px] text-[#737770] uppercase tracking-wider font-medium">
                    100+ Studios & Spaces
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Prominent, High-Impact Dual Animated Showcase (col-span-7) */}
          <div className="lg:col-span-7 relative mt-6 lg:mt-0 flex flex-col items-center">
            
            {/* View Mode Toggle Pill with Animated Active Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.92, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center p-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E2DDD3] shadow-md mb-4 sm:mb-6 z-30"
            >
              <button
                type="button"
                onClick={() => setActiveTab('both')}
                className={`relative px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === 'both'
                    ? 'text-white bg-[#1B4332] shadow-xs'
                    : 'text-[#737770] hover:text-[#121413]'
                }`}
              >
                Dual Showcase
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cal1')}
                className={`relative px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === 'cal1'
                    ? 'text-white bg-[#1B4332] shadow-xs'
                    : 'text-[#737770] hover:text-[#121413]'
                }`}
              >
                Edition 01 (Desk)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cal2')}
                className={`relative px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeTab === 'cal2'
                    ? 'text-white bg-[#1B4332] shadow-xs'
                    : 'text-[#737770] hover:text-[#121413]'
                }`}
              >
                Edition 02 (Archival)
              </button>
            </motion.div>

            {/* EXPANDED & CRYSTAL-CLEAR DUAL SHOWCASE STAGE */}
            <div className="relative w-full max-w-[640px] lg:max-w-none h-[480px] sm:h-[540px] lg:h-[580px] flex items-center justify-center px-2">
              
              {/* Rotating Concentric Artisanal Seal Background Stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.4, y: 60 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-6 right-2 sm:-top-8 sm:right-6 w-28 h-28 pointer-events-none z-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
                  className="w-full h-full rounded-full border border-dashed border-[#1B4332]/30 flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-[#FAF8F4]/85 backdrop-blur-xs flex items-center justify-center p-1.5 text-center shadow-xs">
                    <span className="font-mono text-[7.5px] uppercase tracking-[0.18em] text-[#1B4332] font-bold">
                      SEN TECH • LUXURY GOODS • 2027 •
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Sparkle Micro-Particles */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [-8, 8, -8],
                  x: [-5, 5, -5],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [0.9, 1.15, 0.9],
                }}
                transition={{
                  opacity: { delay: 1.3, duration: 0.6 },
                  scale: { delay: 1.3, duration: 0.6 },
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                }}
                className="absolute top-10 left-6 sm:left-12 pointer-events-none z-20"
              >
                <Sparkles className="w-5 h-5 text-[#E5A024]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [8, -8, 8],
                  x: [6, -6, 6],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  opacity: { delay: 1.4, duration: 0.6 },
                  repeat: Infinity,
                  duration: 5.2,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-16 right-8 sm:right-16 pointer-events-none z-20"
              >
                <Sparkles className="w-4 h-4 text-[#1B4332]" />
              </motion.div>

              {/* ========================================================================= */}
              {/* PHOTO 1: CAL_1 (Primary Desk Edition) - RISES FROM BELOW INTO PLACE */}
              {/* ========================================================================= */}
              <motion.div
                style={{ y: cal1ScrollY }}
                animate={{
                  opacity: activeTab === 'cal2' ? 0.35 : 1,
                  scale:
                    activeTab === 'cal1'
                      ? 1.08
                      : hoveredCard === 'cal1'
                      ? 1.06
                      : activeTab === 'both'
                      ? 1
                      : 0.92,
                  x:
                    activeTab === 'cal1'
                      ? 0
                      : activeTab === 'cal2'
                      ? -60
                      : hoveredCard === 'cal1'
                      ? 0
                      : -15,
                  y:
                    activeTab === 'cal1'
                      ? 0
                      : hoveredCard === 'cal1'
                      ? -12
                      : 0,
                  rotate:
                    activeTab === 'cal1'
                      ? 0
                      : hoveredCard === 'cal1'
                      ? -0.5
                      : -3,
                  zIndex:
                    activeTab === 'cal1'
                      ? 30
                      : hoveredCard === 'cal1'
                      ? 30
                      : 20,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                }}
                onClick={() =>
                  setInspectImage({
                    src: '/cal_1.jpeg',
                    title: 'SEN TECH Daily Desk Calendar',
                    edition: 'Edition 01 • 2027',
                  })
                }
                onMouseEnter={() => setHoveredCard('cal1')}
                onMouseLeave={() => setHoveredCard(null)}
                className="absolute left-6 sm:left-12 lg:left-10 w-[240px] sm:w-[290px] lg:w-[330px] aspect-[3/4.4] cursor-pointer group"
                data-cursor="view"
                data-cursor-text="EDITION 01"
              >
                {/* Entrance Motion Container Rising From Below */}
                <motion.div
                  initial={{ opacity: 0, y: 220, scale: 0.82 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 1.0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-full"
                >
                  {/* Continuous Organic Floating Levitation Loop for Cal 1 */}
                  <motion.div
                    animate={{
                      y: [-8, 8, -8],
                      rotate: [-0.8, 0.8, -0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5.6,
                      ease: 'easeInOut',
                    }}
                    className="w-full h-full"
                  >
                    <Tilt3D maxTiltX={4} maxTiltY={4} className="w-full h-full">
                      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#1B4332]/20 border-[3px] border-white transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(27,67,50,0.35)]">
                        
                        {/* Crystal Clear Image with zero obstruction */}
                        <Image
                          src="/cal_1.jpeg"
                          alt="SEN TECH Premium Daily Calendar 2027 - Edition 01"
                          fill
                          priority
                          sizes="(max-width: 768px) 85vw, 420px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Continuous Diagonal Light Sweep Reflection */}
                        <motion.div
                          animate={{
                            x: ['-120%', '220%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatDelay: 4,
                            duration: 1.8,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
                        />

                        {/* Header Badge */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#DCE8DE] shadow-xs flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#1B4332] animate-pulse" />
                          <span className="text-[9px] font-mono font-bold text-[#1B4332] uppercase tracking-wider">
                            EDITION 01 • DESK
                          </span>
                        </div>

                        {/* Bottom Clean Floating Label */}
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E2DDD3] flex items-center justify-between shadow-sm">
                          <div>
                            <p className="font-serif text-xs font-semibold text-[#121413] leading-tight">
                              Daily Desk Classic
                            </p>
                            <p className="text-[9px] text-[#737770] font-sans font-medium uppercase tracking-wider mt-0.5">
                              Solid Wood Mount • Gold Foil
                            </p>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#1B4332] bg-[#EBF2EC] px-2 py-0.5 rounded border border-[#DCE8DE]">
                            CAL-01
                          </span>
                        </div>
                      </div>
                    </Tilt3D>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ========================================================================= */}
              {/* PHOTO 2: CAL_2 (Archival Wall Edition) - RISES FROM BELOW INTO PLACE */}
              {/* ========================================================================= */}
              <motion.div
                style={{ y: cal2ScrollY }}
                animate={{
                  opacity: activeTab === 'cal1' ? 0.35 : 1,
                  scale:
                    activeTab === 'cal2'
                      ? 1.08
                      : hoveredCard === 'cal2'
                      ? 1.06
                      : activeTab === 'both'
                      ? 1
                      : 0.92,
                  x:
                    activeTab === 'cal2'
                      ? 0
                      : activeTab === 'cal1'
                      ? 70
                      : hoveredCard === 'cal2'
                      ? 0
                      : 35,
                  y:
                    activeTab === 'cal2'
                      ? 0
                      : hoveredCard === 'cal2'
                      ? -12
                      : 0,
                  rotate:
                    activeTab === 'cal2'
                      ? 0
                      : hoveredCard === 'cal2'
                      ? 0.5
                      : 3,
                  zIndex:
                    activeTab === 'cal2'
                      ? 30
                      : hoveredCard === 'cal2'
                      ? 30
                      : 15,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 22,
                }}
                onClick={() =>
                  setInspectImage({
                    src: '/cal_2.jpeg',
                    title: 'SEN TECH Archival Wall Calendar',
                    edition: 'Edition 02 • 2027',
                  })
                }
                onMouseEnter={() => setHoveredCard('cal2')}
                onMouseLeave={() => setHoveredCard(null)}
                className="absolute right-2 sm:right-6 lg:right-4 w-[240px] sm:w-[290px] lg:w-[330px] aspect-[3/4.4] cursor-pointer group"
                data-cursor="view"
                data-cursor-text="EDITION 02"
              >
                {/* Entrance Motion Container Rising From Below */}
                <motion.div
                  initial={{ opacity: 0, y: 260, scale: 0.82 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 1.15,
                    delay: 1.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full h-full"
                >
                  {/* Continuous Counter-Rhythm Floating Levitation Loop for Cal 2 */}
                  <motion.div
                    animate={{
                      y: [8, -8, 8],
                      rotate: [0.8, -0.8, 0.8],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6.4,
                      ease: 'easeInOut',
                    }}
                    className="w-full h-full"
                  >
                    <Tilt3D maxTiltX={4} maxTiltY={4} className="w-full h-full">
                      <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl shadow-[#1B4332]/18 border-[3px] border-white transition-shadow duration-500 group-hover:shadow-[0_25px_60px_-15px_rgba(27,67,50,0.35)]">
                        
                        {/* Crystal Clear Image with zero obstruction */}
                        <Image
                          src="/cal_2.jpeg"
                          alt="SEN TECH Archival Wall Calendar 2027 - Edition 02"
                          fill
                          sizes="(max-width: 768px) 85vw, 420px"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Continuous Diagonal Light Sweep Reflection */}
                        <motion.div
                          animate={{
                            x: ['-120%', '220%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            repeatDelay: 4.8,
                            duration: 1.8,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
                        />

                        {/* Header Badge */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#DCE8DE] shadow-xs flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#1B4332] animate-pulse" />
                          <span className="text-[9px] font-mono font-bold text-[#1B4332] uppercase tracking-wider">
                            EDITION 02 • ARCHIVAL
                          </span>
                        </div>

                        {/* Bottom Clean Floating Label */}
                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-[#E2DDD3] flex items-center justify-between shadow-sm">
                          <div>
                            <p className="font-serif text-xs font-semibold text-[#121413] leading-tight">
                              Archival Wall Edit
                            </p>
                            <p className="text-[9px] text-[#737770] font-sans font-medium uppercase tracking-wider mt-0.5">
                              300 GSM Cotton • Teak Accent
                            </p>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#1B4332] bg-[#EBF2EC] px-2 py-0.5 rounded border border-[#DCE8DE]">
                            CAL-02
                          </span>
                        </div>
                      </div>
                    </Tilt3D>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Bottom Interactive Floating Hint in Website Emerald Green Theme */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#EBF2EC]/95 backdrop-blur-md text-[#1B4332] text-[11px] font-sans font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-xs pointer-events-none flex items-center gap-2 z-30 border border-[#DCE8DE]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>Hover or click cards to inspect details</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Traveling Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-6 sm:pt-10 relative z-10"
      >
        <a
          href="#collection"
          className="flex items-center gap-3 text-[#737770] hover:text-[#121413] transition-colors group select-none"
        >
          <div className="w-5 h-8 rounded-full border border-[#737770]/60 flex items-start justify-center p-1 bg-white/60">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-2 rounded-full bg-[#1B4332]"
            />
          </div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
            Scroll to Discover
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-[11px] font-mono text-[#737770]">
          <span>01 / 06</span>
          <span className="w-12 h-[1px] bg-[#E2DDD3]" />
          <span>SEN TECH STORE</span>
        </div>
      </motion.div>

      {/* FULLSCREEN QUICK INSPECT MODAL */}
      <AnimatePresence>
        {inspectImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setInspectImage(null)}
            className="fixed inset-0 z-50 bg-[#121413]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-3 sm:p-4"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectImage(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#121413] hover:bg-white hover:scale-110 transition-all flex items-center justify-center shadow-lg border border-[#E2DDD3]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[3/4.4] w-full rounded-2xl overflow-hidden bg-[#FAF8F4] shadow-inner">
                <Image
                  src={inspectImage.src}
                  alt={inspectImage.title}
                  fill
                  quality={100}
                  className="object-contain"
                />
              </div>

              <div className="mt-4 px-2 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#121413]">
                    {inspectImage.title}
                  </h3>
                  <p className="text-xs text-[#737770] font-mono">
                    {inspectImage.edition} • Archival Stock Quality
                  </p>
                </div>
                <MagneticButton
                  as="a"
                  href="#collection"
                  onClick={() => setInspectImage(null)}
                >
                  <span className="btn-wipe inline-flex items-center gap-2 bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-md">
                    <span>Order Edition</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}



