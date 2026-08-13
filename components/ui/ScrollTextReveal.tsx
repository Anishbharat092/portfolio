'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface ScrollTextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

// Separate component for each word so Hooks are called legally at top level
function WordToken({
  word,
  index,
  totalWords,
  scrollYProgress,
}: {
  word: string
  index: number
  totalWords: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / totalWords
  const start = index * (step * 0.75)
  const end = Math.min(start + step * 1.5, 1)

  // Top-level hook calls per component (100% compliant with React Rules of Hooks)
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1])
  const y = useTransform(scrollYProgress, [start, end], [14, 0])
  const z = useTransform(scrollYProgress, [start, end], [-30, 0])
  const rotateX = useTransform(scrollYProgress, [start, end], [35, 0])

  return (
    <motion.span
      style={{
        opacity,
        y,
        z,
        rotateX,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      className="inline-block origin-bottom transition-colors duration-100"
    >
      {word}
    </motion.span>
  )
}

export default function ScrollTextReveal({
  text,
  className = '',
  as: Component = 'p',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'start 0.45'],
  })

  const words = text.split(' ')

  return (
    <Component className={`relative inline-block ${className}`}>
      <span
        ref={containerRef}
        className="flex flex-wrap gap-x-[0.3em] gap-y-1"
        style={{ perspective: '800px' }}
      >
        {words.map((word, i) => (
          <WordToken
            key={i}
            word={word}
            index={i}
            totalWords={words.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </span>
    </Component>
  )
}