'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  parallaxOffset?: number
  aspectRatio?: string
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
  parallaxOffset = 40,
  aspectRatio = 'aspect-[4/5]',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Smooth vertical parallax translation inside the wrapper
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-parallaxOffset, parallaxOffset]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
    >
      <motion.div
        style={{ y, scale }}
        className="absolute -inset-x-0 -inset-y-10 w-full h-[calc(100%+80px)]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center ${imageClassName}`}
        />
      </motion.div>
    </div>
  )
}
