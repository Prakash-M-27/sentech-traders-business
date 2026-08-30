'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrollWordColorRevealProps {
  paragraph: string
  className?: string
}

function Word({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.18, 1])
  const color = useTransform(progress, range, ['#B8B5AD', '#141413'])

  return (
    <span className="relative inline-block mr-[0.28em] my-[0.05em]">
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  )
}

export default function ScrollWordColorReveal({
  paragraph,
  className = '',
}: ScrollWordColorRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.35'],
  })

  const words = paragraph.split(' ')

  return (
    <div ref={containerRef} className={`relative flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} range={[start, end]} progress={scrollYProgress}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}
