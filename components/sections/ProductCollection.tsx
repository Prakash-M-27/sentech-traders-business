'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, X, MessageSquare, Sparkles, SlidersHorizontal } from 'lucide-react'
import Image from 'next/image'
import Tilt3D from '@/components/motion/Tilt3D'
import MagneticButton from '@/components/motion/MagneticButton'
import { products, type Product } from '@/lib/products'

const categories = [
  { id: 'all', label: 'All Editions' },
  { id: 'wall', label: 'Wall Planners' },
  { id: 'accessory', label: 'Handcrafted Mounts' },
]

export default function ProductCollection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const handleWhatsAppEnquire = (product: Product) => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918608059455'
    const msg = encodeURIComponent(
      `Hello Sen Tech team, I am interested in ordering the ${product.name} (${product.subtitle}). Please share pricing and bulk customization details.`
    )
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'wall') return p.id.includes('daily-calendar') || p.mark !== '05'
    if (activeCategory === 'accessory') return p.id.includes('frame') || p.id.includes('mount') || p.mark === '05'
    return true
  })

  return (
    <section
      id="collection"
      className="py-24 lg:py-36 bg-[#FFFFFF] relative border-b border-[#E2DDD3] overflow-hidden"
    >
      {/* Giant Atmospheric Background Watermark Typography */}
      <div
        className="absolute top-1/4 -right-12 pointer-events-none select-none overflow-hidden opacity-[0.032] z-0"
        aria-hidden="true"
      >
        <span className="font-serif text-[24vw] leading-none whitespace-nowrap text-[#121413] tracking-tighter">
          EDITIONS
        </span>
      </div>

      {/* Subtle Atmospheric Grid Background Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#121413_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Section Intro with Masked Staggered Headline Animations */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16 pb-8 border-b border-[#E2DDD3]">
          <div>
            {/* Animated Kicker Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B4332] animate-ping" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-[#1B4332] bg-[#EBF2EC] border border-[#DCE8DE] px-3 py-1 rounded-full">
                The 2027 Edit
              </span>
            </motion.div>

            {/* Masked Word-by-Word Reveal */}
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-extrabold text-editorial-lg text-[#121413] tracking-tight uppercase leading-[0.95]"
              >
                Curated <br />
                <span className="font-serif font-normal italic text-[#1B4332] capitalize">
                  Calendar Editions.
                </span>
              </motion.h2>
            </div>
          </div>

          {/* Animated Description Paragraph with Blur In */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm sm:text-base text-[#4A4D49] leading-relaxed font-sans font-normal"
          >
            From daily desktop companions to wide architectural wall planners,
            each edition is printed on heavyweight archival stock and hand-inspected for timeless durability.
          </motion.p>
        </div>

        {/* Animated Category Filter Tab Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12"
        >
          <div className="flex items-center gap-2 p-1.5 bg-[#F7F4EC] rounded-full border border-[#E2DDD3]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full font-mono text-xs font-bold transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-[#737770] hover:text-[#121413]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="curatedActiveTab"
                      className="absolute inset-0 bg-[#1B4332] rounded-full shadow-md z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Dynamic Product Cards Grid with Ultra 3D Tilt & Micro-Animations */}
        <motion.div layout className="space-y-12 lg:space-y-16">
          {/* Main Editions Grid (Row 1 & 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {filteredProducts.slice(0, 4).map((product, idx) => {
              const isHovered = hoveredId === product.id

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Tilt3D maxTiltX={3.5} maxTiltY={3.5}>
                    <div
                      onClick={() => setSelectedProduct(product)}
                      onMouseEnter={() => setHoveredId(product.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="group relative h-full bg-[#FAF8F5] hover:bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E2DDD3] hover:border-[#1B4332] cursor-pointer transition-all duration-500 hover:shadow-2xl overflow-hidden flex flex-col justify-between"
                      data-cursor="view"
                      data-cursor-text="EXPLORE"
                    >
                      {/* Animated Specular Shimmer Sweep on Hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                      {/* Header Badge & Large Faint Watermark */}
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full animate-pulse"
                            style={{ backgroundColor: product.accentColor }}
                          />
                          <span
                            className="text-xs font-mono font-bold px-3.5 py-1 rounded-full uppercase tracking-wider transition-all duration-300 border"
                            style={{
                              backgroundColor: isHovered ? product.accentColor : '#FFFFFF',
                              color: isHovered ? '#FFFFFF' : product.accentColor,
                              borderColor: product.accentColor,
                            }}
                          >
                            {product.badge || `Edition ${product.mark}`}
                          </span>
                        </div>

                        {/* Large Animated Mark Watermark */}
                        <span className="font-serif text-3xl font-bold text-[#121413]/20 group-hover:text-[#1B4332] group-hover:scale-110 transition-all duration-300">
                          {product.mark}
                        </span>
                      </div>

                      {/* 100% Full Uncropped Image with Ambient Floating & Hover Elevation */}
                      <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl bg-white my-4 border border-[#E2DDD3] p-2 sm:p-3 flex items-center justify-center transition-all duration-500">
                        <div className={`float-card-${(idx % 4) + 1} w-full h-full relative`}>
                          <Image
                            src={product.photo}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                            priority={idx === 0}
                          />
                        </div>
                      </div>

                      {/* Metadata Row with Magnetic Action Button */}
                      <div className="flex items-end justify-between pt-6 border-t border-[#E2DDD3] relative z-10">
                        <div>
                          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#121413] group-hover:text-[#1B4332] group-hover:translate-x-1 transition-all duration-300">
                            {product.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#4A4D49] mt-1 font-sans font-medium">
                            {product.subtitle} • {product.specs.paper}
                          </p>
                        </div>

                        {/* Magnetic Interactive Button */}
                        <MagneticButton as="div">
                          <div className="w-11 h-11 rounded-full bg-white border border-[#E2DDD3] flex items-center justify-center text-[#121413] group-hover:bg-[#1B4332] group-hover:text-white group-hover:border-[#1B4332] transition-all duration-300 shadow-md group-hover:shadow-lg">
                            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45 stroke-[2.4]" />
                          </div>
                        </MagneticButton>
                      </div>
                    </div>
                  </Tilt3D>
                </motion.div>
              )
            })}
          </div>

          {/* Row 3: Special Craft Edition (Wooden Frames) */}
          {products[4] && (activeCategory === 'all' || activeCategory === 'accessory') && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tilt3D maxTiltX={2.5} maxTiltY={2.5}>
                <div
                  onClick={() => setSelectedProduct(products[4])}
                  onMouseEnter={() => setHoveredId(products[4].id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative bg-[#F5EFE6] hover:bg-[#FAF6EF] rounded-3xl p-8 sm:p-12 border-2 border-[#E6DCCE] hover:border-[#8C5E3C] cursor-pointer transition-all duration-500 hover:shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  data-cursor="view"
                  data-cursor-text="INSPECT"
                >
                  {/* Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20" />

                  <div className="lg:col-span-6 space-y-4 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C5E3C] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#8C5E3C] bg-[#EFE4D6] border border-[#E0D2C0] px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                        Handcrafted Accessory
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#121413] group-hover:text-[#8C5E3C] transition-colors duration-300">
                      {products[4].name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4A4D49] leading-relaxed">
                      {products[4].description}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#5A5E57]">
                      {['Reclaimed Teakwood', 'Beeswax Polish', 'Brass Alignment'].map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-3.5 py-1.5 bg-white rounded-xl border border-[#E6DCCE] font-medium shadow-sm group-hover:border-[#8C5E3C]/30 transition-colors"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative z-10">
                    {/* 100% Full Uncropped Image with Hover Zoom */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl border-2 border-white bg-white p-3 flex items-center justify-center transition-all duration-500">
                      <div className="float-card-4 w-full h-full relative">
                        <Image
                          src={products[4].photo}
                          alt={products[4].name}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Interactive 3D Pop Quick-View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#121413]/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border-2 border-[#E2DDD3] p-6 sm:p-10 relative"
              initial={{ scale: 0.9, y: 30, rotateX: 6, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, rotateX: 6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-[#F2EFE8] text-[#121413] hover:bg-[#1B4332] hover:text-white transition-all duration-300 border border-[#E2DDD3] cursor-pointer shadow-sm hover:scale-110"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 stroke-[2.4]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* 100% Full Uncropped Product Image with Floating Levitation */}
                <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-[#E2DDD3] bg-[#FAF8F4] p-3 flex items-center justify-center">
                  <div className="float-card-1 w-full h-full relative">
                    <Image
                      src={selectedProduct.photo}
                      alt={selectedProduct.name}
                      fill
                      sizes="350px"
                      className="object-contain object-center"
                    />
                  </div>
                </div>

                {/* Product Specs & Interactive Enquiry CTA */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B4332] bg-[#EBF2EC] border border-[#DCE8DE] px-3.5 py-1 rounded-full">
                      Edition {selectedProduct.mark}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121413] mt-2.5">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-[#1B4332] font-semibold mt-0.5">
                      {selectedProduct.subtitle}
                    </p>
                    <p className="mt-4 text-sm text-[#4A4D49] leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Key Features List with Pop-In Animations */}
                  <div className="space-y-2.5 border-t border-[#ECE7DE] pt-4">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#737770]">
                      Key Highlights
                    </p>
                    {selectedProduct.features.map((feat, fIdx) => (
                      <motion.div
                        key={fIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + fIdx * 0.05 }}
                        className="flex items-center gap-2.5 text-xs text-[#121413] font-medium"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#EBF2EC] flex items-center justify-center text-[#1B4332] shrink-0 border border-[#DCE8DE]">
                          <Check className="w-3.5 h-3.5 stroke-[2.8]" />
                        </span>
                        <span>{feat}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs bg-[#F9F7F2] p-4 rounded-2xl border border-[#ECE7DE]">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#737770] font-bold block">Paper Stock</span>
                      <span className="font-semibold text-[#121413] mt-0.5 block">{selectedProduct.specs.paper}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#737770] font-bold block">Dimensions</span>
                      <span className="font-semibold text-[#121413] mt-0.5 block">{selectedProduct.specs.dimensions}</span>
                    </div>
                  </div>

                  {/* Direct WhatsApp & Custom Order CTAs */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => handleWhatsAppEnquire(selectedProduct)}
                      className="btn-wipe flex-1 bg-[#1B4332] hover:bg-[#122F23] text-white font-sans text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-[#1B4332]/20 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span>Order on WhatsApp</span>
                    </button>
                    <a
                      href="#enquiry"
                      onClick={() => setSelectedProduct(null)}
                      className="bg-[#F2EFE8] hover:bg-[#EBE5DB] text-[#121413] font-sans text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-full text-center border border-[#E2DDD3] transition-colors duration-300"
                    >
                      Custom Quote
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
