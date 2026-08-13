'use client'

import { useEffect, useRef } from 'react'

export default function Cursor3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = width / 2
    let mouseY = height / 2
    let targetX = width / 2
    let targetY = height / 2

    // Generate floating 3D matrix particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 2 + 0.5, // 3D depth scaling
      size: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    const render = () => {
      // Smooth lerp mouse tracking
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Draw Cursor Radial Glow
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        350
      )
      gradient.addColorStop(0, 'rgba(168, 85, 247, 0.18)') // Purple glow
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.08)') // Indigo tint
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 350, 0, Math.PI * 2)
      ctx.fill()

      // Render 3D Depth Particles & Connective Mesh
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i]
        p.x += p.vx * p.z
        p.y += p.vy * p.z

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Parallax offset based on cursor distance and particle depth (Z)
        const dx = (mouseX - width / 2) * (p.z * 0.02)
        const dy = (mouseY - height / 2) * (p.z * 0.02)

        const drawX = p.x + dx
        const drawY = p.y + dy

        ctx.fillStyle = `rgba(192, 132, 252, ${0.3 * p.z})`
        ctx.beginPath()
        ctx.arc(drawX, drawY, p.size * p.z, 0, Math.PI * 2)
        ctx.fill()

        // Draw connective wireframe lines to nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 120) {
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.6 * p.z
            ctx.beginPath()
            ctx.moveTo(drawX, drawY)
            ctx.lineTo(p2.x + dx, p2.y + dy)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  )
}