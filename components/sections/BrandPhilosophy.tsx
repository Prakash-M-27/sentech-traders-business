'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Compass, ShieldCheck, Heart, Award, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import ScrollWordColorReveal from '@/components/motion/ScrollWordColorReveal'
import AnimatedCounter from '@/components/motion/AnimatedCounter'
import Tilt3D from '@/components/motion/Tilt3D'
import { brandStats } from '@/lib/products'

export default function BrandPhilosophy() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Multi-layer Parallax Offsets
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 50])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98])
  const badge1Y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const badge2Y = useTransform(scrollYProgress, [0, 1], [-25, 35])
  const bgTextY = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section
      ref={containerRef}
      id="story"
      className="py-24 lg:py-36 bg-[#FAF7F2] relative overflow-hidden border-b border-[#E2DDD3]"
    >
      {/* Decorative Atmospheric Floating Typography in Background */}
      <motion.div
        style={{ y: bgTextY }}
        className="absolute top-1/4 -right-10 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[22vw] leading-none whitespace-nowrap text-[#121413]">
          PHILOSOPHY
        </span>
      </motion.div>

      {/* Ambient Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Animated Kicker Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-pulse" />
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-[#1B4332] bg-[#EBF2EC] border border-[#DCE8DE] px-3.5 py-1 rounded-full shadow-sm">
            Brand Philosophy • Our Story
          </span>
        </motion.div>

        {/* Master Architectural Manifesto Typography (Aligned & Staggered) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 lg:mb-20 pb-8 border-b border-[#E2DDD3]">
          {/* Left Block: "We don't just Make calendars." */}
          <div className="lg:col-span-6 space-y-2">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#121413] tracking-tight uppercase block leading-[0.95]"
              >
                We don’t just
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-normal italic text-4xl sm:text-6xl lg:text-7xl text-[#1B4332] block capitalize leading-[0.95]"
              >
                Make calendars.
              </motion.span>
            </div>
          </div>

          {/* Right Block: "We design Better days." */}
          <div className="lg:col-span-6 space-y-2 lg:pl-8 lg:border-l border-[#E2DDD3]">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[#121413] tracking-tight uppercase block leading-[0.95]"
              >
                We design
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-normal italic text-4xl sm:text-6xl lg:text-7xl text-[#C07D38] block capitalize leading-[0.95]"
              >
                Better days.
              </motion.span>
            </div>
          </div>
        </div>

        {/* Dynamic Dual Grid: Manifesto Reading (Left) + Grand Animated Header Image Stage (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-12 lg:my-16">
          {/* Left: Word-by-Word Scroll Color Reveal Manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B4332] animate-pulse" />
              <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#737770]">
                The Artisanal Manifesto
              </p>
            </div>

            <ScrollWordColorReveal
              paragraph="We believe planning your day should feel as beautiful as living it. In an age of relentless digital screens and fleeting notifications, a physical calendar is an anchor of quiet intention. Every sheet is cut from 280 GSM archival cotton, every binding coil is hand-aligned, and every date is made to be kept."
              className="font-serif text-2xl sm:text-3xl leading-[1.38] text-[#121413] font-normal"
            />

            {/* Core Values Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {[
                { icon: ShieldCheck, text: 'Archival Cotton Stock', color: '#1B4332' },
                { icon: Compass, text: 'Gold Foiled Framing', color: '#C07D38' },
                { icon: Award, text: 'Custom Enterprise Branding', color: '#8C5E3C' },
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E2DDD3] text-xs font-mono font-semibold text-[#121413] shadow-sm hover:border-[#1B4332] transition-colors cursor-default"
                >
                  <val.icon className="w-3.5 h-3.5" style={{ color: val.color }} />
                  <span>{val.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Grand Animated Header Image Stage with Multi-Layer 3D Physics */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              initial={{ opacity: 0, scale: 0.94, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="float-card-1">
                <Tilt3D maxTiltX={4} maxTiltY={4}>
                  <div
                    className="group relative w-full h-[360px] sm:h-[460px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F3ECE0] cursor-pointer transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(27,67,50,0.25)]"
                    data-cursor="view"
                    data-cursor-text="CRAFT"
                  >
                    {/* Continuous Shimmer Light Sweep on Hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                    {/* Master Header Image Showing Full Rich Composition */}
                    <Image
                      src="/header_image.png"
                      alt="Sen Tech Artisanal 2025/2026 Calendar Collection"
                      fill
                      sizes="(max-width: 1024px) 100vw, 800px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      priority
                    />

                    {/* Gradient Depth Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Floating Glassmorphism Badges Inside Image */}
                    <motion.div
                      style={{ y: badge1Y }}
                      className="absolute top-5 left-5 z-30 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-mono text-[#121413] font-bold border border-white/40 shadow-lg flex items-center gap-2"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-ping" />
                      <span>2025 / 2026 Master Edition</span>
                    </motion.div>

                    <motion.div
                      style={{ y: badge2Y }}
                      className="absolute bottom-5 right-5 z-30 bg-[#121413]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl text-xs font-mono text-white font-bold border border-white/20 shadow-lg flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C07D38] animate-spin" style={{ animationDuration: '6s' }} />
                      <span>Timeless Traditions • Hand-Crafted</span>
                    </motion.div>
                  </div>
                </Tilt3D>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Brand Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 sm:pt-20 border-t border-[#E2DDD3]">
          {brandStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 rounded-2xl bg-white/80 hover:bg-white border border-[#E2DDD3] hover:border-[#1B4332] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#737770] uppercase tracking-wider">
                  0{i + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#1B4332]/30 group-hover:bg-[#1B4332] transition-colors" />
              </div>

              <div>
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-[#121413] tracking-tight group-hover:text-[#1B4332] transition-colors">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <span className="font-sans font-bold text-xs text-[#1B4332] uppercase tracking-wider mt-1 block">
                  {stat.label}
                </span>
                <span className="text-[11px] font-mono text-[#737770] mt-0.5 block font-medium">
                  {stat.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
