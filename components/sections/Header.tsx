'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Search, X, Menu, ArrowUpRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import MagneticButton from '@/components/motion/MagneticButton'
import { searchSite, type SearchItem } from '@/lib/search-data'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const { scrollY } = useScroll()

  // Track scroll state for blur background effect (always stay visible)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20)
  })

  // Keyboard shortcut Cmd+K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [searchOpen])

  const results: SearchItem[] = searchSite(query)

  const navLinks = [
    { name: 'Calendars', href: '#collection' },
    { name: 'Features', href: '#features' },
    { name: 'Quality', href: '#craftsmanship' },
    { name: 'About Us', href: '#story' },
    { name: 'Reviews', href: '#testimonials' },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2DDD3] shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-3.5'
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a
            href="#top"
            className="flex items-center gap-3.5 group select-none"
            aria-label="SEN TECH Home"
            data-cursor="hover"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105 border border-[#E2DDD3] bg-white">
              <Image
                src="/sentech_logo_180x180.png"
                alt="SEN TECH Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#121413] group-hover:text-[#1B4332] transition-colors duration-300">
                SEN TECH
              </span>
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-[#737770] -mt-0.5 font-medium hidden sm:block">
                Import | Export
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10 font-sans text-xs font-semibold uppercase tracking-wider text-[#4A4D49]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="animated-underline hover:text-[#121413] transition-colors py-1"
                data-cursor="hover"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full bg-[#F2EFE8]/80 hover:bg-[#EBE5DB] text-[#121413] border border-[#E2DDD3] transition-colors flex items-center gap-2 group"
              aria-label="Search site"
              data-cursor="hover"
            >
              <Search className="w-4 h-4 text-[#121413] stroke-[2.2]" />
              <span className="text-[10px] font-sans font-semibold text-[#737770] hidden lg:inline-flex items-center gap-1 bg-[#EBE5DB] px-2 py-0.5 rounded text-[10px]">
                <span>⌘</span>K
              </span>
            </button>

            {/* Enquire CTA with Magnetic Button */}
            <MagneticButton
              as="a"
              href="#enquiry"
              className="hidden sm:inline-block"
              data-cursor="cta"
            >
              <span className="btn-wipe inline-flex items-center gap-2 bg-[#1B4332] hover:bg-[#122F23] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />
              </span>
            </MagneticButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#F2EFE8] text-[#121413] border border-[#E2DDD3] transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-[#121413] stroke-[2.2]" />
              ) : (
                <Menu className="w-5 h-5 text-[#121413] stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#FFFFFF] flex flex-col justify-between p-8 pt-28 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#737770]">
                Menu
              </span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href === '#collection' ? '#features' : link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-3xl text-[#121413] hover:text-[#1B4332] transition-colors"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-[#E2DDD3] flex flex-col gap-4">
              <a
                href="#enquiry"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-[#1B4332] text-white font-sans text-xs font-bold uppercase tracking-wider py-4 rounded-full flex items-center justify-center gap-2"
              >
                <span>Request Custom Order</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </a>
              <div className="text-center text-xs text-[#737770] flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C07D38]" />
                <span>Trichy, Tamil Nadu • Shipping All-India</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#121413]/60 backdrop-blur-sm flex items-start justify-center pt-20 sm:pt-28 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E2DDD3] overflow-hidden"
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[#ECE7DE] bg-[#F9F7F2]">
                <Search className="w-5 h-5 text-[#1B4332] stroke-[2.2]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search calendars, paper stock, custom editions, contact..."
                  className="w-full bg-transparent outline-none text-base text-[#121413] placeholder:text-[#A6AAA2] font-sans"
                  aria-label="Search"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-md text-[#737770] hover:text-[#121413] hover:bg-[#EBE5DB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results List */}
              <div className="max-h-80 overflow-y-auto p-4 space-y-1.5">
                {query.trim() ? (
                  results.length > 0 ? (
                    results.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F9F7F2] transition-colors group border border-transparent hover:border-[#E2DDD3]"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="font-sans font-semibold text-sm text-[#121413] group-hover:text-[#1B4332] transition-colors">
                            {item.title}
                          </span>
                          <span className="text-xs text-[#737770]">
                            {item.description}
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#F2EFE8] rounded-full text-[#4A4D49] font-medium border border-[#E2DDD3]">
                          {item.category}
                        </span>
                      </a>
                    ))
                  ) : (
                    <div className="py-8 text-center text-sm text-[#737770]">
                      No results found for &ldquo;{query}&rdquo;
                    </div>
                  )
                ) : (
                  <div className="py-6 px-4 text-center">
                    <p className="text-xs text-[#737770] mb-3">Popular Searches</p>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {['Daily Calendar', 'Teakwood Frame', '280 GSM Stock', 'Custom Branding', 'Trichy Contact'].map(
                        (tag) => (
                          <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="text-xs px-3.5 py-1.5 rounded-full bg-[#F2EFE8] hover:bg-[#EBE5DB] text-[#121413] font-medium border border-[#E2DDD3] transition-colors"
                          >
                            {tag}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
