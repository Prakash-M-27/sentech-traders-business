'use client'

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface TrailItem {
  id: number
  x: number
  y: number
  image: string
  rotation: number
}

interface ImageTrailProps {
  children: ReactNode
  images: string[]
  className?: string
  distanceThreshold?: number
}

export default function ImageTrail({
  children,
  images,
  className = '',
  distanceThreshold = 85,
}: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<TrailItem[]>([])
  const lastPosRef = useRef({ x: 0, y: 0 })
  const imageIndexRef = useRef(0)
  const isEnabledRef = useRef(false)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    isEnabledRef.current = hasFinePointer && !prefersReducedMotion
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isEnabledRef.current || !containerRef.current || images.length === 0)
      return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const distance = Math.hypot(dx, dy)

    if (distance > distanceThreshold) {
      lastPosRef.current = { x, y }
      const currentImage = images[imageIndexRef.current % images.length]
      imageIndexRef.current += 1

      const newItem: TrailItem = {
        id: Date.now() + Math.random(),
        x,
        y,
        image: currentImage,
        rotation: (Math.random() - 0.5) * 14,
      }

      setItems((prev) => [...prev.slice(-6), newItem])
    }
  }

  // Auto clean stale trail items
  useEffect(() => {
    if (items.length === 0) return
    const timer = setTimeout(() => {
      setItems((prev) => prev.slice(1))
    }, 450)
    return () => clearTimeout(timer)
  }, [items])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.6, rotate: item.rotation - 4 }}
              animate={{ opacity: 1, scale: 1, rotate: item.rotation }}
              exit={{
                opacity: 0,
                scale: 0.4,
                y: -15,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                transform: 'translate(-50%, -50%)',
              }}
              className="w-24 h-32 rounded-lg shadow-xl overflow-hidden border border-white/60 bg-paper-white pointer-events-none"
            >
              <Image
                src={item.image}
                alt="Calendar trail preview"
                fill
                sizes="96px"
                className="object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
