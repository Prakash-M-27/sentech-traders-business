'use client'

import { useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
  as?: 'button' | 'div' | 'a'
  href?: string
  'data-cursor'?: string
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as: Component = 'div',
  href,
  'data-cursor': dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseEnter = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
      data-cursor={dataCursor}
    >
      {Component === 'a' ? (
        <a href={href} onClick={onClick} className="block w-full h-full">
          {children}
        </a>
      ) : Component === 'button' ? (
        <button onClick={onClick} className="block w-full h-full">
          {children}
        </button>
      ) : (
        <div onClick={onClick}>{children}</div>
      )}
    </motion.div>
  )
}
