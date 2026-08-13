'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  x?: number
  y?: number
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export default function FadeIn({
  children,
  x = 0,
  y = 0,
  delay = 0,
  duration = 0.8,
  className,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
