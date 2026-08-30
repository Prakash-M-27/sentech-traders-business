'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface TextRevealProps {
  children?: ReactNode
  text?: string
  mode?: 'line' | 'word' | 'block'
  className?: string
  delay?: number
  duration?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export default function TextReveal({
  children,
  text,
  mode = 'line',
  className = '',
  delay = 0,
  duration = 0.8,
  as: Component = 'div',
}: TextRevealProps) {
  if (text && mode === 'word') {
    const words = text.split(' ')

    return (
      <Component className={`flex flex-wrap gap-x-[0.3em] ${className}`}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-[0.1em]">
            <motion.span
              className="inline-block"
              initial={{ y: '115%', opacity: 0, rotate: 1.5 }}
              whileInView={{ y: '0%', opacity: 1, rotate: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: duration * 0.9,
                delay: delay + index * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Component>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children || text}
      </motion.div>
    </div>
  )
}
