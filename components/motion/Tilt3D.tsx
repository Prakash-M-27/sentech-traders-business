'use client'

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

interface Tilt3DProps {
  children: ReactNode
  className?: string
  maxTiltX?: number
  maxTiltY?: number
  enableGlow?: boolean
}

export default function Tilt3D({
  children,
  className = '',
  maxTiltX = 3.5,
  maxTiltY = 4,
  enableGlow = true,
}: Tilt3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Motion values
  const rawRotateX = useMotionValue(0)
  const rawRotateY = useMotionValue(0)
  const rawGlowX = useMotionValue(50)
  const rawGlowY = useMotionValue(50)

  // Smooth springs
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const rotateX = useSpring(rawRotateX, springConfig)
  const rotateY = useSpring(rawRotateY, springConfig)
  const glowX = useSpring(rawGlowX, springConfig)
  const glowY = useSpring(rawGlowY, springConfig)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const isWideEnough = window.innerWidth >= 768
    setIsDesktop(hasFinePointer && isWideEnough)
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Normalize coordinates (-1 to 1)
    const normalizedX = (x - centerX) / centerX
    const normalizedY = (y - centerY) / centerY

    // Apply strict maximum tilt limits
    rawRotateX.set(-normalizedY * maxTiltX)
    rawRotateY.set(normalizedX * maxTiltY)

    rawGlowX.set((x / rect.width) * 100)
    rawGlowY.set((y / rect.height) * 100)
  }

  const handleMouseEnter = () => {
    if (!isDesktop) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (!isDesktop) return
    setIsHovered(false)
    rawRotateX.set(0)
    rawRotateY.set(0)
    rawGlowX.set(50)
    rawGlowY.set(50)
  }

  if (!isDesktop) {
    return <div className={`relative w-full h-full ${className}`}>{children}</div>
  }

  return (
    <div
      ref={cardRef}
      className={`perspective-1200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d"
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
      >
        {children}

        {enableGlow && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 0.35 : 0,
              background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
