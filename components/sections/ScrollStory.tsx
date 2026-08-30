'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Sparkles, Compass, ShieldCheck } from 'lucide-react'
import Tilt3D from '@/components/motion/Tilt3D'

interface PhotoSlide {
  step: string
  title: string
  subtitle: string
  image: string
  alt: string
  accent: string
}

// 4-photo collection
const photoSlides: PhotoSlide[] = [
  {
    step: '01',
    title: 'Architectural Wall Edition',
    subtitle: 'Sage Editorial Minimalist',
    image: '/cal_1.jpeg',
    alt: 'Sen Tech Artisanal Calendar — Edition 01',
    accent: '#1B4332',
  },
  {
    step: '02',
    title: '280 GSM Archival Cotton',
    subtitle: 'Warm Ochre Studio Planner',
    image: '/cal_2.jpeg',
    alt: 'Sen Tech Artisanal Calendar — Edition 02',
    accent: '#C07D38',
  },
  {
    step: '03',
    title: 'Tactile Gold Foil Detailing',
    subtitle: 'Terracotta & Clay Compact',
    image: '/cal_3.jpeg',
    alt: 'Sen Tech Artisanal Calendar — Edition 03',
    accent: '#C86D51',
  },
  {
    step: '04',
    title: 'Solid Handcrafted Wall Mount',
    subtitle: 'Botanical Sky & Family Edit',
    image: '/cal_4.jpeg',
    alt: 'Sen Tech Artisanal Calendar — Edition 04',
    accent: '#8C5E3C',
  },
]

const mainPills = ['01', '02', '03', '04']

export default function ScrollStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const timelineBarRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const bgWordRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const activeStepRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0) // 0 (Step 1) to 3 (Step 4)

  // Smooth scroll to next or previous photo step
  const handleNavigate = (direction: 'prev' | 'next') => {
    const currentStep = activeStepRef.current
    const targetStep =
      direction === 'prev'
        ? Math.max(0, currentStep - 1)
        : Math.min(3, currentStep + 1)

    if (targetStep === currentStep) return

    const st = scrollTriggerRef.current
    if (st) {
      const targetProgress = targetStep / 3
      const targetY = st.start + targetProgress * (st.end - st.start)
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    const track = trackRef.current
    const timelineBar = timelineBarRef.current
    const progressBar = progressBarRef.current
    const bgWord = bgWordRef.current
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    if (!section || !pinWrapper || !track || cards.length < 4) return

    // Position track such that card at `currentFloatIndex` is in the EXACT HORIZONTAL CENTER of the screen
    const updateTrackAndCards = (
      currentFloatIndex: number,
      currentProgress: number
    ) => {
      // Update active step only on discrete step change to avoid re-renders
      const logicalStep = Math.min(
        Math.max(Math.round(currentFloatIndex), 0),
        3
      )
      if (activeStepRef.current !== logicalStep) {
        activeStepRef.current = logicalStep
        setActiveIndex(logicalStep)
      }

      // Update progress bar width directly in DOM
      if (progressBar) {
        gsap.set(progressBar, { width: `${Math.min(currentProgress * 100, 100)}%` })
      }

      // Parallax background watermark text drift
      if (bgWord) {
        const bgOffset = (currentProgress - 0.5) * -120
        gsap.set(bgWord, { x: bgOffset })
      }

      const cardEl = cards[0]
      if (cardEl && track) {
        const cardWidth = cardEl.offsetWidth
        const gap = 32 // gap-8 = 32px
        const stride = cardWidth + gap
        // Centering math: track has left: 50%. An offset of -cardWidth/2 centers card 0.
        const targetX = -(cardWidth / 2) - currentFloatIndex * stride
        gsap.set(track, { x: targetX })
      }

      // End-stage subtle shrink (progress 0.88 -> 1.00)
      let endScaleFactor = 1.0
      let endYOffset = 0

      if (currentProgress > 0.88) {
        const exitNorm = (currentProgress - 0.88) / 0.12 // 0 -> 1
        endScaleFactor = gsap.utils.interpolate(1.0, 0.88, exitNorm)
        endYOffset = gsap.utils.interpolate(0, -20, exitNorm)
      }

      cards.forEach((card, i) => {
        const dist = Math.abs(i - currentFloatIndex)

        // Strict 3-photo visibility logic:
        let opacity = 0
        let scale = 0.78

        if (dist <= 1.25) {
          if (dist <= 1.0) {
            opacity = gsap.utils.interpolate(1.0, 0.42, dist)
            scale = gsap.utils.interpolate(1.0, 0.85, dist)
          } else {
            const edgeNorm = (dist - 1.0) / 0.25
            opacity = gsap.utils.interpolate(0.42, 0, edgeNorm)
            scale = gsap.utils.interpolate(0.85, 0.78, edgeNorm)
          }
        }

        const finalScale = scale * endScaleFactor
        const zIndex = dist < 0.5 ? 30 : dist < 1.25 ? 15 : 1

        gsap.to(card, {
          scale: finalScale,
          y: endYOffset,
          opacity,
          autoAlpha: opacity > 0.02 ? opacity : 0,
          zIndex,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto',
        })
      })
    }

    // GSAP ScrollTrigger Pinned Timeline across 380vh
    const totalSteps = photoSlides.length - 1 // 3 steps (0 -> 1 -> 2 -> 3)
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=380%',
      pin: pinWrapper,
      pinSpacing: true,
      anticipatePin: 1,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress

        // 1. Timeline fade-in (progress 0.0 -> 0.12)
        if (timelineBar) {
          const barP = gsap.utils.clamp(0, 1, p / 0.12)
          const barOpacity = gsap.utils.interpolate(0, 1, barP)
          const barY = gsap.utils.interpolate(24, 0, barP)
          gsap.set(timelineBar, { opacity: barOpacity, y: barY })
        }

        // 2. Continuous horizontal card sliding centering
        const currentFloatIndex = p * totalSteps
        updateTrackAndCards(currentFloatIndex, p)
      },
    })

    scrollTriggerRef.current = st

    // Initial setup on mount: Photo 1 in EXACT horizontal center
    if (timelineBar) {
      gsap.set(timelineBar, { opacity: 0, y: 24 })
    }
    updateTrackAndCards(0, 0)

    const handleResize = () => {
      ScrollTrigger.refresh()
      updateTrackAndCards(activeStepRef.current, 0)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      st.kill()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="bs-trigger relative bg-[#F7F4EC] border-b border-[#E2DDD3] overflow-hidden min-h-[380vh]"
    >
      {/* Pinned container .bs-pin stays fixed while scrolling through .bs-trigger */}
      <div
        ref={pinWrapperRef}
        className="bs-pin h-screen w-full flex flex-col justify-between overflow-hidden py-4 sm:py-6 px-4 sm:px-8 lg:px-12 relative"
      >
        {/* Giant Atmospheric Background Depth Typography (Like Hero Section Back Side) */}
        <div
          ref={bgWordRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.038] z-0 flex justify-center will-change-transform"
          aria-hidden="true"
        >
          <span className="font-serif text-[22vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
            COLLECTIONS
          </span>
        </div>

        {/* Ambient Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full max-h-[920px] relative z-10">
          {/* Top Header with Active Step Numbers & Timeline Progress */}
          <div className="w-full flex items-center justify-between gap-4 pb-4 border-b border-[#E2DDD3] z-30">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#1B4332] animate-pulse" />
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#121413] tracking-tight uppercase leading-none">
                  CALENDAR{' '}
                  <span className="font-serif font-normal italic text-[#1B4332] capitalize">
                    COLLECTIONS
                  </span>
                </h2>
              </div>
            </div>

            {/* Timeline Fade-In Progress Bar & Step Indicators */}
            <div
              ref={timelineBarRef}
              className="bs-timeline-bar flex items-center gap-3 sm:gap-5 will-change-transform"
            >
              {/* Step Indicators 1 -> 2 -> 3 -> 4 */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {mainPills.map((step, idx) => {
                  const isActive = activeIndex === idx
                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => {
                        const st = scrollTriggerRef.current
                        if (st) {
                          const targetY = st.start + (idx / 3) * (st.end - st.start)
                          window.scrollTo({ top: targetY, behavior: 'smooth' })
                        }
                      }}
                      className={`px-3.5 py-1 rounded-full font-mono text-xs font-bold transition-all duration-300 border cursor-pointer ${
                        isActive
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md scale-105 ring-2 ring-[#1B4332]/20'
                          : 'bg-white text-[#737770] hover:text-[#121413] border-[#E2DDD3]'
                      }`}
                    >
                      {step}
                    </button>
                  )
                })}
              </div>

              {/* Progress Track */}
              <div className="w-20 sm:w-32 h-2 bg-[#E2DDD3] rounded-full overflow-hidden shrink-0 shadow-inner">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-[#1B4332] via-[#C07D38] to-[#1B4332] origin-left w-0"
                />
              </div>
            </div>
          </div>

          {/* Central Carousel Stage with High-Visibility Interactive Arrow Buttons & Glowing Shimmer */}
          <div className="w-full my-auto py-2 relative h-[62vh] sm:h-[68vh] lg:h-[72vh] max-h-[660px] overflow-visible flex items-center justify-center">
            {/* Premium High-Visibility Left Arrow Button */}
            <button
              type="button"
              onClick={() => handleNavigate('prev')}
              disabled={activeIndex === 0}
              aria-label="Previous calendar edition"
              className={`absolute left-0 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeIndex === 0
                  ? 'bg-[#E5DFD3] text-[#A8A296] border border-[#D5CEC0] cursor-not-allowed opacity-20 shadow-none'
                  : 'bg-[#1B4332] hover:bg-[#C07D38] text-[#F7F4EC] hover:text-white border-2 border-[#C07D38] hover:border-[#1B4332] shadow-[0_12px_32px_rgba(27,67,50,0.45)] hover:shadow-[0_16px_40px_rgba(192,125,56,0.55)] hover:scale-110 active:scale-95 cursor-pointer group ring-4 ring-white/70'
              }`}
              data-cursor="hover"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3] transition-transform duration-300 group-hover:-translate-x-1" />
            </button>

            {/* Premium High-Visibility Right Arrow Button */}
            <button
              type="button"
              onClick={() => handleNavigate('next')}
              disabled={activeIndex === 3}
              aria-label="Next calendar edition"
              className={`absolute right-0 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeIndex === 3
                  ? 'bg-[#E5DFD3] text-[#A8A296] border border-[#D5CEC0] cursor-not-allowed opacity-20 shadow-none'
                  : 'bg-[#1B4332] hover:bg-[#C07D38] text-[#F7F4EC] hover:text-white border-2 border-[#C07D38] hover:border-[#1B4332] shadow-[0_12px_32px_rgba(27,67,50,0.45)] hover:shadow-[0_16px_40px_rgba(192,125,56,0.55)] hover:scale-110 active:scale-95 cursor-pointer group ring-4 ring-white/70'
              }`}
              data-cursor="hover"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Horizontal Track positioned at left: 50% for exact center alignment of Card 0 */}
            <div
              ref={trackRef}
              className="absolute top-0 bottom-0 flex items-center gap-8 will-change-transform"
              style={{
                left: '50%',
                transform: 'translateX(0px)',
              }}
            >
              {photoSlides.map((slide, idx) => {
                const isCenter = activeIndex === idx

                return (
                  <div
                    key={slide.step}
                    ref={(el) => {
                      cardRefs.current[idx] = el
                    }}
                    className="shrink-0 w-[280px] sm:w-[360px] md:w-[400px] lg:w-[440px] xl:w-[470px] will-change-transform"
                  >
                    <div className={`float-card-${idx + 1} w-full h-full`}>
                      <Tilt3D
                        maxTiltX={isCenter ? 3.5 : 0}
                        maxTiltY={isCenter ? 3.5 : 0}
                      >
                        {/* Full Photo Frame with 100% Complete Uncropped Image Visibility */}
                        <div
                          className={`relative w-full h-[58vh] sm:h-[64vh] lg:h-[68vh] max-h-[620px] rounded-3xl overflow-hidden transition-all duration-500 border-4 p-2 sm:p-3 flex items-center justify-center group ${
                            isCenter
                              ? 'border-white bg-gradient-to-b from-[#FAF8F4] to-[#ECE6DB] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] ring-2 ring-black/10'
                              : 'border-white/80 bg-white/70 shadow-md'
                          }`}
                          data-cursor="view"
                          data-cursor-text={`PHOTO ${slide.step}`}
                        >
                          {/* Shimmer Light Sweep on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                          {/* 100% Complete Uncropped Image */}
                          <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <Image
                              src={slide.image}
                              alt={slide.alt}
                              fill
                              sizes="(max-width: 768px) 85vw, (max-width: 1280px) 440px, 470px"
                              className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                              priority={idx <= 1}
                            />
                          </div>

                          {/* Active Center Edition Glassmorphic Badge */}
                          {isCenter && (
                            <div className="absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-[#121413] font-bold border border-white/40 shadow-md flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full animate-ping"
                                style={{ backgroundColor: slide.accent }}
                              />
                              <span>Edition {slide.step}</span>
                            </div>
                          )}
                        </div>

                        {/* Edition Label Placed Below Photo */}
                        <div className="mt-3.5 flex items-center justify-between px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: slide.accent }}
                            />
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#121413]">
                              Edition {slide.step}
                            </span>
                          </div>
                          <span className="text-xs font-sans text-[#737770] font-semibold">
                            {slide.title}
                          </span>
                        </div>
                      </Tilt3D>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Status & Feature Indicator Line */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-[#737770] uppercase tracking-wider pt-3 border-t border-[#E2DDD3]/80 z-30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C07D38]" />
              <span>Browse Wall Editions (0{activeIndex + 1}/04)</span>
            </div>
            <span className="hidden sm:inline font-bold text-[#1B4332]">
              SEN TECH ARTISANAL EDITIONS
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
