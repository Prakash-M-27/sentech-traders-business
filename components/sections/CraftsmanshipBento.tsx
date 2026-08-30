'use client'

import { motion } from 'framer-motion'
import { TreePine, Droplets, PenTool, Shield, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export default function CraftsmanshipBento() {
  return (
    <section
      id="craftsmanship"
      className="py-24 lg:py-36 bg-[#FFFFFF] relative border-b border-[#E2DDD3] overflow-hidden"
    >
      {/* Giant Atmospheric Background Watermark Typography */}
      <div
        className="absolute top-1/3 -left-10 pointer-events-none select-none overflow-hidden opacity-[0.03] z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[20vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          CRAFTSMANSHIP
        </span>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332]" />
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-[#1B4332]">
              Artisanal Standards
            </span>
          </div>
          <h2 className="font-display font-extrabold text-editorial-lg text-[#121413] tracking-tight uppercase leading-[0.95]">
            Obsessed with <br />
            <span className="font-serif font-normal italic text-[#1B4332] capitalize">
              Every detail.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#4A4D49] leading-relaxed max-w-2xl font-sans">
            A celebration of traditional printing presses, tactile paper physics,
            and sustainable materials crafted right here in Tamil Nadu.
          </p>
        </div>

        {/* Clean Bento Grid without cursor-following trail images */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Bento Block 1: Large Wooden Framing Craft (Span 7) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 bg-[#F5EFE6] rounded-3xl p-8 sm:p-10 border border-[#E6DCCE] flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="z-10">
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#8C5E3C] uppercase tracking-wider mb-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#EFE4D6] border border-[#E0D2C0] flex items-center justify-center">
                  <TreePine className="w-4 h-4 text-[#8C5E3C] stroke-[2.2]" />
                </div>
                <span>Woodcraft & Mounts</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#121413] max-w-sm">
                Solid Reclaimed Teak & Seasoned Oak.
              </h3>
              <p className="mt-2 text-sm text-[#4A4D49] max-w-md font-sans">
                Each frame is hand-milled, sanded through three progressive grits,
                and sealed with organic beeswax to highlight rich natural wood grain.
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-white my-6 bg-white">
              <Image
                src="/new.jpeg"
                alt="Crafted wooden frames"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#737770] pt-2 border-t border-[#E6DCCE] z-10 font-medium">
              <span>Natural Beeswax Finish</span>
              <span>Zero Synthetic Lacquers</span>
            </div>
          </motion.div>

          {/* Bento Block 2: Paper & Ink Science (Span 5) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 bg-[#EEF4EF] rounded-3xl p-8 sm:p-10 border border-[#DCE8DE] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-[#1B4332] uppercase tracking-wider mb-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#DCE8DE] border border-[#C5D9C8] flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-[#1B4332] stroke-[2.2]" />
                </div>
                <span>Pigment & Paper</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#121413]">
                Archival 280 GSM Cotton Blend.
              </h3>
              <p className="mt-2 text-sm text-[#4A4D49] leading-relaxed font-sans">
                Tested with over 20 different pen nibs and inks. No feathering,
                no smearing, and zero bleed-through across consecutive leaves.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-md border border-[#DCE8DE] my-6 bg-white p-2 flex items-center justify-center">
              <Image
                src="/cal_2.jpeg"
                alt="Daily Calendar Edition 02 - Archival 280 GSM Cotton Blend"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#737770] pt-2 border-t border-[#DCE8DE] font-medium">
              <span>FSC Certified</span>
              <span>Acid-Free Paper</span>
            </div>
          </motion.div>

          {/* Bento Block 3: Minimal Quote & Editorial Statement (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-[#1B4332] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl"
          >
            <div className="font-serif text-6xl text-[#DCE8DE]/40 leading-none">
              “
            </div>
            <p className="font-serif text-xl sm:text-2xl leading-snug my-4 text-white">
              The most important calendar entries are the quiet days you set aside for yourself.
            </p>
            <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-mono text-[#DCE8DE]">
              <span>SEN TECH STUDIO</span>
              <span>EST. TRICHY</span>
            </div>
          </motion.div>

          {/* Bento Block 4: Brass Binding & Perforation Details (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-[#FAF5E6] rounded-3xl p-8 border border-[#F0E5CA] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#F7EFCF] border border-[#EADBAC] text-[#C07D38] flex items-center justify-center mb-4 shadow-sm">
                <PenTool className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#121413]">
                Micro-Tooth Tear Lines
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4D49] leading-relaxed font-sans">
                Engineered perforations with 14 teeth per inch for an ultra-clean,
                satisfying tear without tearing the next page.
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0E5CA] flex items-center justify-between text-xs font-mono text-[#737770] font-medium">
              <span>Zero Ragged Edges</span>
              <span>Smooth Release</span>
            </div>
          </motion.div>

          {/* Bento Block 5: Bespoke Custom Orders (Span 4) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 bg-[#F2EFE8] rounded-3xl p-8 border border-[#E2DDD3] flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#EBF2EC] border border-[#DCE8DE] text-[#1B4332] flex items-center justify-center mb-4 shadow-sm">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="font-display font-bold text-lg text-[#121413]">
                Bespoke Corporate Editions
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#4A4D49] leading-relaxed font-sans">
                Custom gold/silver hot foil debossing of your corporate logo, custom start dates, and luxury gift packaging.
              </p>
            </div>

            <a
              href="#enquiry"
              className="animated-underline inline-flex items-center gap-1.5 text-xs font-bold text-[#1B4332] pt-4 border-t border-[#E2DDD3] uppercase tracking-wider"
            >
              <span>Request Custom Catalog</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
