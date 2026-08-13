'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

function Char({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <motion.span style={{ opacity }}>
      {children}
    </motion.span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const container = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.85', 'start 0.25'],
  })

  const chars = text.split('')

  return (
    <p ref={container} className={className} aria-label={text}>
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </p>
  )
}
