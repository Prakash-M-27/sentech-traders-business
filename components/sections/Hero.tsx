'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Sparkles,
  X,
  Eye,
  Layers,
} from 'lucide-react'
import Image from 'next/image'
import Tilt3D from '@/components/motion/Tilt3D'
import MagneticButton from '@/components/motion/MagneticButton'

interface HeroEdition {
  id: string
  number: string
  title: string
  subtitle: string
  tag: string
  photo: string
  tone: string
  accent: string
  bgBadge: string
  specs: string
  mount: string
}

// First two flagship calendar editions
const HERO_EDITIONS: HeroEdition[] = [
  {
    id: 'cal1',
    number: '01',
    title: 'Daily Wall Edition',
    subtitle: 'Sage Editorial Classic',
    tag: 'SAGE • WALL CLASSIC',
    photo: '/new_cal_1.jpeg',
    tone: 'sage',
    accent: '#1B4332',
    bgBadge: '#EBF2EC',
    specs: '280 GSM Archival Cotton',
    mount: 'Solid Teak Wood Mount',
  },
  {
    id: 'cal2',
    number: '02',
    title: 'Warm Ochre Studio',
    subtitle: 'Warm Ochre Studio Planner',
    tag: 'OCHRE • STUDIO PLANNER',
    photo: '/cal_2.jpeg',
    tone: 'butter',
    accent: '#C07D38',
    bgBadge: '#FAF4E3',
    specs: '300 GSM Heavyweight Stock',
    mount: 'Top-stitched Reinforced Header',
  },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'both' | 'cal1' | 'cal2'>('both')
  const [hoveredCard, setHoveredCard] = useState<'cal1' | 'cal2' | null>(null)
  const [inspectImage, setInspectImage] = useState<{ src: string; title: string; edition: string; specs: string } | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [flyStarted, setFlyStarted] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && window.matchMedia('(pointer: fine)').matches)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    const handleStartFly = () => {
      setFlyStarted(true)
    }
    window.addEventListener('page-card-start-fly', handleStartFly)
    window.addEventListener('page-loaded', handleStartFly)

    // Safety fallback timer if opening card was already skipped or fast load
    const timer = setTimeout(() => {
      setFlyStarted(true)
    }, 1500)

    return () => {
      window.removeEventListener('resize', checkDesktop)
      window.removeEventListener('page-card-start-fly', handleStartFly)
      window.removeEventListener('page-loaded', handleStartFly)
      clearTimeout(timer)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax scroll effects
  const heroContentY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const cal1ScrollY = useTransform(scrollYProgress, [0, 1], [0, -35])
  const cal2ScrollY = useTransform(scrollYProgress, [0, 1], [0, -20])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25])

  return (
    <section
      ref={containerRef}
      id="top"
      className="relative min-h-0 lg:min-h-screen pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-16 overflow-hidden flex flex-col justify-between bg-[#FCFBF8]"
    >
      {/* Ambient Atmospheric Radial Gradient Glows */}
      <div className="hidden sm:block pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.09, 0.16, 0.09],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-full blur-[140px] -z-10"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.07, 0.14, 0.07],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute top-1/3 left-[5%] w-[500px] h-[500px] bg-gradient-to-tr from-[#C07D38] to-[#E5A024] rounded-full blur-[130px] -z-10"
        />
      </div>

      {/* Atmospheric Subtle Watermark Background Typography */}
      <motion.div
        style={isDesktop ? { y: bgTextY } : undefined}
        className="absolute top-12 right-0 left-0 pointer-events-none select-none overflow-hidden opacity-[0.035] z-0 flex justify-center"
        aria-hidden="true"
      >
        <span className="font-serif text-[18vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          SEN TECH 2027
        </span>
      </motion.div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <motion.div
          style={isDesktop ? { y: heroContentY, opacity } : undefined}
          className="flex flex-col items-center text-center"
        >
          {/* ========================================================================= */}
          {/* 1. TOP INTERACTIVE VIEW CONTROLS */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-3 sm:mb-5"
          >
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'both'
                  ? 'bg-[#1B4332] text-white shadow-sm'
                  : 'bg-white/90 text-[#737770] hover:text-[#121413] border border-[#E2DDD3]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Dual Presentation</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cal1')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'cal1'
                  ? 'bg-[#121413] text-white shadow-sm scale-105'
                  : 'bg-white/90 text-[#4A4D49] hover:text-[#121413] border border-[#E2DDD3] hover:border-[#121413]/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#1B4332]" />
              <span>01 SAGE WALL</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('cal2')}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'cal2'
                  ? 'bg-[#121413] text-white shadow-sm scale-105'
                  : 'bg-white/90 text-[#4A4D49] hover:text-[#121413] border border-[#E2DDD3] hover:border-[#121413]/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#C07D38]" />
              <span>02 WARM OCHRE</span>
            </button>
          </motion.div>

          {/* ========================================================================= */}
          {/* 2. THE MAIN THING: PROFESSIONAL DUAL CALENDAR SHOWCASE */}
          {/* ========================================================================= */}
          <div className="relative w-full max-w-5xl h-[390px] xs:h-[440px] sm:h-[550px] lg:h-[620px] xl:h-[650px] flex items-center justify-center">
            
            {/* Rotating Concentric Artisanal Brand Seal Stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="hidden lg:flex absolute top-2 right-4 w-32 h-32 pointer-events-none z-0 items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 36, ease: 'linear' }}
                className="w-full h-full rounded-full border border-dashed border-[#1B4332]/30 flex items-center justify-center"
              >
                <div className="w-28 h-28 rounded-full bg-[#FAF8F4]/85 backdrop-blur-xs flex items-center justify-center p-2 text-center shadow-2xs">
                  <span className="font-mono text-[7.5px] uppercase tracking-[0.2em] text-[#1B4332] font-bold">
                    SEN TECH • ARTISANAL EDITIONS • 2027 •
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Sparkle Micro-Particles */}
            <motion.div
              animate={{
                y: [-6, 6, -6],
                opacity: [0.4, 0.85, 0.4],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="hidden sm:block absolute top-8 left-8 pointer-events-none z-10"
            >
              <Sparkles className="w-5 h-5 text-[#E5A024]" />
            </motion.div>

            <motion.div
              animate={{
                y: [6, -6, 6],
                opacity: [0.3, 0.75, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
              className="hidden sm:block absolute bottom-12 right-12 pointer-events-none z-10"
            >
              <Sparkles className="w-4 h-4 text-[#1B4332]" />
            </motion.div>

            {/* DUAL 3D PERSPECTIVE STAGE */}
            <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
              
              {/* ------------------------------------------------------------- */}
              {/* PHOTO 1: NEW_CAL_1 (Daily Wall Edition • Sage) */}
              {/* Starts completely hidden & flies in visibly as curtains lift */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={isDesktop ? { y: cal1ScrollY } : undefined}
                initial={{
                  opacity: 0,
                  x: isDesktop ? -850 : -400,
                  y: isDesktop ? 30 : 15,
                  rotate: -18,
                  scale: 0.85,
                }}
                animate={
                  !flyStarted
                    ? {
                        opacity: 0,
                        x: isDesktop ? -850 : -400,
                        y: isDesktop ? 30 : 15,
                        rotate: -18,
                        scale: 0.85,
                      }
                    : {
                        opacity: activeTab === 'cal2' ? 0.35 : 1,
                        scale:
                          activeTab === 'cal1'
                            ? 1.08
                            : isDesktop && hoveredCard === 'cal1'
                            ? 1.06
                            : activeTab === 'both'
                            ? 1.0
                            : 0.95,
                        x:
                          activeTab === 'cal1'
                            ? 0
                            : activeTab === 'cal2'
                            ? (isDesktop ? -260 : -110)
                            : isDesktop && hoveredCard === 'cal1'
                            ? -175
                            : isDesktop
                            ? -210
                            : -95,
                        y:
                          activeTab === 'cal1'
                            ? 0
                            : isDesktop && hoveredCard === 'cal1'
                            ? -12
                            : 0,
                        rotate:
                          activeTab === 'cal1'
                            ? 0
                            : isDesktop && hoveredCard === 'cal1'
                            ? -0.5
                            : isDesktop
                            ? -3
                            : -2,
                        zIndex:
                          activeTab === 'cal1'
                            ? 35
                            : isDesktop && hoveredCard === 'cal1'
                            ? 35
                            : 25,
                      }
                }
                transition={{
                  duration: flyStarted ? (isDesktop ? 1.35 : 1.0) : 0,
                  delay: 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (activeTab === 'cal2') {
                    setActiveTab('cal1')
                  } else {
                    setInspectImage({
                      src: '/new_cal_1.jpeg',
                      title: 'SEN TECH Daily Wall Calendar',
                      edition: 'Edition 01 • 2027',
                      specs: '280 GSM Archival Cotton • Teak Mount',
                    })
                  }
                }}
                onMouseEnter={() => isDesktop && setHoveredCard('cal1')}
                onMouseLeave={() => isDesktop && setHoveredCard(null)}
                className="absolute w-[185px] xs:w-[215px] sm:w-[290px] lg:w-[350px] xl:w-[380px] aspect-[3/4.4] cursor-pointer group select-none"
                data-cursor="view"
                data-cursor-text="EDITION 01"
              >
                {/* Floating Levitation Loop for Cal 1 */}
                <motion.div
                  animate={
                    isDesktop
                      ? {
                          y: [-8, 8, -8],
                          rotate: [-0.6, 0.6, -0.6],
                        }
                      : undefined
                  }
                  transition={
                    isDesktop
                      ? {
                          repeat: Infinity,
                          duration: 5.8,
                          ease: 'easeInOut',
                        }
                      : undefined
                  }
                  className="w-full h-full"
                >
                  <Tilt3D maxTiltX={4.5} maxTiltY={4.5} className="w-full h-full">
                    <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl border-2 sm:border-[3px] border-white transition-all duration-500 group-hover:shadow-[0_30px_70px_-15px_rgba(27,67,50,0.38)]">
                      
                      {/* High-Resolution Photo */}
                      <Image
                        src="/new_cal_1.jpeg"
                        alt="SEN TECH Premium Daily Calendar 2027 - Edition 01"
                        fill
                        priority
                        sizes="(max-width: 768px) 90vw, 440px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Continuous Diagonal Light Sweep Reflection */}
                      {isDesktop && (
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
                      )}

                      {/* Top Header Floating Badge */}
                      <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#DCE8DE] shadow-xs flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1B4332] animate-pulse" />
                        <span className="text-[8px] sm:text-[9.5px] font-mono font-bold text-[#1B4332] uppercase tracking-wider">
                          EDITION 01 • WALL CLASSIC
                        </span>
                      </div>

                      {/* Top Right Quick-Inspect Eye Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setInspectImage({
                            src: '/new_cal_1.jpeg',
                            title: 'SEN TECH Daily Wall Calendar',
                            edition: 'Edition 01 • 2027',
                            specs: '280 GSM Archival Cotton • Teak Mount',
                          })
                        }}
                        aria-label="Inspect Edition 01"
                        className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E2DDD3] text-[#121413] flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all shadow-xs"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#1B4332]" />
                      </button>

                      {/* Bottom Floating Label */}
                      <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 right-2.5 sm:left-3.5 sm:right-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-[#E2DDD3] flex items-center justify-between shadow-xs">
                        <div className="text-left">
                          <p className="font-serif text-[11px] sm:text-sm font-bold text-[#121413] leading-tight">
                            Daily Wall Edition
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-[#737770] font-sans font-medium uppercase tracking-wider mt-0.5">
                            280 GSM Archival Cotton
                          </p>
                        </div>
                        <span className="text-[9px] sm:text-[11px] font-mono font-bold text-[#1B4332] bg-[#EBF2EC] px-2 py-0.5 rounded border border-[#DCE8DE]">
                          CAL-01
                        </span>
                      </div>
                    </div>
                  </Tilt3D>
                </motion.div>
              </motion.div>

              {/* ------------------------------------------------------------- */}
              {/* PHOTO 2: CAL_2 (Warm Ochre Studio Edition) */}
              {/* Starts completely hidden & flies in visibly as curtains lift */}
              {/* ------------------------------------------------------------- */}
              <motion.div
                style={isDesktop ? { y: cal2ScrollY } : undefined}
                initial={{
                  opacity: 0,
                  x: isDesktop ? 850 : 400,
                  y: isDesktop ? -20 : -10,
                  rotate: 18,
                  scale: 0.85,
                }}
                animate={
                  !flyStarted
                    ? {
                        opacity: 0,
                        x: isDesktop ? 850 : 400,
                        y: isDesktop ? -20 : -10,
                        rotate: 18,
                        scale: 0.85,
                      }
                    : {
                        opacity: activeTab === 'cal1' ? 0.35 : 1,
                        scale:
                          activeTab === 'cal2'
                            ? 1.08
                            : isDesktop && hoveredCard === 'cal2'
                            ? 1.06
                            : activeTab === 'both'
                            ? 0.98
                            : 0.94,
                        x:
                          activeTab === 'cal2'
                            ? 0
                            : activeTab === 'cal1'
                            ? (isDesktop ? 260 : 110)
                            : isDesktop && hoveredCard === 'cal2'
                            ? 175
                            : isDesktop
                            ? 210
                            : 95,
                        y:
                          activeTab === 'cal2'
                            ? 0
                            : isDesktop && hoveredCard === 'cal2'
                            ? -12
                            : 14,
                        rotate:
                          activeTab === 'cal2'
                            ? 0
                            : isDesktop && hoveredCard === 'cal2'
                            ? 0.5
                            : isDesktop
                            ? 3
                            : 2,
                        zIndex:
                          activeTab === 'cal2'
                            ? 35
                            : isDesktop && hoveredCard === 'cal2'
                            ? 35
                            : 20,
                      }
                }
                transition={{
                  duration: flyStarted ? (isDesktop ? 1.38 : 1.02) : 0,
                  delay: flyStarted ? (isDesktop ? 0.05 : 0.02) : 0,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (activeTab === 'cal1') {
                    setActiveTab('cal2')
                  } else {
                    setInspectImage({
                      src: '/cal_2.jpeg',
                      title: 'SEN TECH Archival Studio Calendar',
                      edition: 'Edition 02 • 2027',
                      specs: '300 GSM Heavyweight Stock • Ochre',
                    })
                  }
                }}
                onMouseEnter={() => isDesktop && setHoveredCard('cal2')}
                onMouseLeave={() => isDesktop && setHoveredCard(null)}
                className="absolute w-[185px] xs:w-[215px] sm:w-[290px] lg:w-[350px] xl:w-[380px] aspect-[3/4.4] cursor-pointer group select-none"
                data-cursor="view"
                data-cursor-text="EDITION 02"
              >
                {/* Floating Levitation Loop for Cal 2 */}
                <motion.div
                  animate={
                    isDesktop
                      ? {
                          y: [8, -8, 8],
                          rotate: [0.6, -0.6, 0.6],
                        }
                      : undefined
                  }
                  transition={
                    isDesktop
                      ? {
                          repeat: Infinity,
                          duration: 6.5,
                          ease: 'easeInOut',
                        }
                      : undefined
                  }
                  className="w-full h-full"
                >
                  <Tilt3D maxTiltX={4.5} maxTiltY={4.5} className="w-full h-full">
                    <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-2xl border-2 sm:border-[3px] border-white transition-all duration-500 group-hover:shadow-[0_30px_70px_-15px_rgba(192,125,56,0.38)]">
                      
                      {/* High-Resolution Photo */}
                      <Image
                        src="/cal_2.jpeg"
                        alt="SEN TECH Archival Studio Calendar 2027 - Edition 02"
                        fill
                        sizes="(max-width: 768px) 90vw, 440px"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Continuous Diagonal Light Sweep Reflection */}
                      {isDesktop && (
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
                      )}

                      {/* Top Header Floating Badge */}
                      <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 bg-white/95 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#DCE8DE] shadow-xs flex items-center gap-1 sm:gap-1.5">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#C07D38] animate-pulse" />
                        <span className="text-[8px] sm:text-[9.5px] font-mono font-bold text-[#C07D38] uppercase tracking-wider">
                          EDITION 02 • STUDIO ARCHIVAL
                        </span>
                      </div>

                      {/* Top Right Quick-Inspect Eye Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setInspectImage({
                            src: '/cal_2.jpeg',
                            title: 'SEN TECH Archival Studio Calendar',
                            edition: 'Edition 02 • 2027',
                            specs: '300 GSM Heavyweight Stock • Ochre',
                          })
                        }}
                        aria-label="Inspect Edition 02"
                        className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/95 backdrop-blur-md border border-[#E2DDD3] text-[#121413] flex items-center justify-center opacity-85 hover:opacity-100 hover:scale-110 transition-all shadow-xs"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-[#C07D38]" />
                      </button>

                      {/* Bottom Floating Label */}
                      <div className="absolute bottom-2.5 sm:bottom-3.5 left-2.5 right-2.5 sm:left-3.5 sm:right-3.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-xl border border-[#E2DDD3] flex items-center justify-between shadow-xs">
                        <div className="text-left">
                          <p className="font-serif text-[11px] sm:text-sm font-bold text-[#121413] leading-tight">
                            Warm Ochre Studio
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-[#737770] font-sans font-medium uppercase tracking-wider mt-0.5">
                            300 GSM Heavyweight Stock
                          </p>
                        </div>
                        <span className="text-[9px] sm:text-[11px] font-mono font-bold text-[#C07D38] bg-[#FAF4E3] px-2 py-0.5 rounded border border-[#C07D38]/30">
                          CAL-02
                        </span>
                      </div>
                    </div>
                  </Tilt3D>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. BELOW THE MAIN THING: OVERSIZED HEADLINE 'Make Room For good days.' */}
          {/* ========================================================================= */}
          <div className="mt-6 sm:mt-10 overflow-hidden py-1">
            <motion.h1
              initial={{ y: '40%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-black text-[2.4rem] xs:text-[3.2rem] sm:text-[4.6rem] lg:text-[5.6rem] leading-[0.96] text-[#121413] tracking-[-0.04em] uppercase"
            >
              Make Room For{' '}
              <span className="font-serif font-normal italic lowercase text-[#1B4332] tracking-[-0.02em]">
                good days.
              </span>
            </motion.h1>
          </div>

          {/* ========================================================================= */}
          {/* 4. CLEAN DIRECT CALL-TO-ACTION BUTTONS */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <MagneticButton
              as="a"
              href="#collection"
              data-cursor="cta"
            >
              <span className="btn-wipe inline-flex items-center gap-2 sm:gap-3 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-3.5 rounded-full shadow-md shadow-[#1B4332]/20 transition-all duration-300">
                <span>Explore The Collection</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" />
              </span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="#enquiry"
              data-cursor="hover"
            >
              <span className="inline-flex items-center gap-2 bg-white hover:bg-[#F2EFE8] text-[#121413] border border-[#E2DDD3] text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-6 py-3 sm:py-3.5 rounded-full transition-colors duration-300 shadow-2xs">
                <span>Custom Orders</span>
              </span>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 5. BOTTOM TRAVELING SCROLL INDICATOR */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-4 sm:pt-6 relative z-10"
      >
        <a
          href="#collection"
          className="flex items-center gap-2.5 text-[#737770] hover:text-[#121413] transition-colors group select-none"
        >
          <div className="w-4 h-7 sm:w-5 sm:h-8 rounded-full border border-[#737770]/60 flex items-start justify-center p-1 bg-white/60">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="w-1.5 h-2 rounded-full bg-[#1B4332]"
            />
          </div>
          <span className="font-sans text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">
            Scroll To Discover
          </span>
        </a>

        <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-[11px] font-mono text-[#737770]">
          <span>01 / 06</span>
          <span className="w-10 sm:w-12 h-[1px] bg-[#E2DDD3]" />
          <span>SEN TECH ARTISANAL STORE</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 6. FULLSCREEN QUICK INSPECT MODAL */}
      {/* ========================================================================= */}
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
              className="relative max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-3 sm:p-5"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setInspectImage(null)}
                aria-label="Close modal"
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

              <div className="mt-4 px-2 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121413]">
                    {inspectImage.title}
                  </h3>
                  <p className="text-xs text-[#737770] font-mono mt-0.5">
                    {inspectImage.edition} • {inspectImage.specs}
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






