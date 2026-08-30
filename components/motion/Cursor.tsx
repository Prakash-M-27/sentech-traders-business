'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorType, setCursorType] = useState<
    'default' | 'hover' | 'view' | 'drag' | 'cta'
  >('default')
  const [cursorText, setCursorText] = useState('')

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics for smooth trailing interpolation
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer & not reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false)
      return
    }

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      const viewTarget = target.closest('[data-cursor="view"]')
      const dragTarget = target.closest('[data-cursor="drag"]')
      const ctaTarget = target.closest('[data-cursor="cta"]')
      const interactiveTarget = target.closest(
        'a, button, input, textarea, [role="button"], .interactive'
      )

      if (viewTarget) {
        setCursorType('view')
        setCursorText(viewTarget.getAttribute('data-cursor-text') || 'VIEW →')
      } else if (dragTarget) {
        setCursorType('drag')
        setCursorText(dragTarget.getAttribute('data-cursor-text') || 'DRAG →')
      } else if (ctaTarget) {
        setCursorType('cta')
        setCursorText('')
      } else if (interactiveTarget) {
        setCursorType('hover')
        setCursorText('')
      } else {
        setCursorType('default')
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveMouse, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveMouse)
      window.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [mouseX, mouseY])

  if (!enabled) return null

  // Variant sizing and styles based on cursor type
  const variants = {
    default: {
      width: 10,
      height: 10,
      backgroundColor: '#141413',
      color: '#FFFFFF',
      opacity: 0.8,
    },
    hover: {
      width: 36,
      height: 36,
      backgroundColor: 'rgba(20, 20, 19, 0.08)',
      borderColor: 'rgba(20, 20, 19, 0.35)',
      borderWidth: '1px',
      color: '#141413',
      opacity: 1,
    },
    cta: {
      width: 44,
      height: 44,
      backgroundColor: '#1B4332',
      color: '#FFFFFF',
      opacity: 1,
    },
    view: {
      width: 78,
      height: 78,
      backgroundColor: '#1B4332',
      color: '#FFFFFF',
      opacity: 1,
    },
    drag: {
      width: 78,
      height: 78,
      backgroundColor: '#141413',
      color: '#FFFFFF',
      opacity: 1,
    },
  }

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-display font-semibold text-[11px] tracking-wider shadow-sm select-none backdrop-blur-[1px]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      variants={variants}
      animate={cursorType}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.4 }}
    >
      {cursorType === 'view' && (
        <span className="text-white text-[10px] tracking-widest font-bold">
          {cursorText}
        </span>
      )}
      {cursorType === 'drag' && (
        <span className="text-white text-[10px] tracking-widest font-bold">
          {cursorText}
        </span>
      )}
      {cursorType === 'cta' && (
        <ArrowUpRight className="w-4 h-4 text-white stroke-[2.2]" />
      )}
    </motion.div>
  )
}
