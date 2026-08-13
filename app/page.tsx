'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import MarqueeSection from '@/components/MarqueeSection'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import ServicesSection from '@/components/ServicesSection'
import ProjectsSection from '@/components/ProjectsSection'
import ContactButton from '@/components/ui/ContactButton'
import Cursor3DCanvas from '@/components/ui/Cursor3DCanvas'
import ScrollTextReveal from '@/components/ui/ScrollTextReveal'

export default function Page() {
  const footerRef = useRef<HTMLElement>(null)

  // Subtle 3D tilt as user scrolls into the bottom viewport
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'center center'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [15, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.2, 1])

  return (
    <main style={{ overflowX: 'clip', background: '#08080A' }} className="text-white relative">
      {/* Floating Glass Navbar */}
      <Navbar />

      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />

      {/* Clean Open-Canvas Footer Section */}
      <footer
        ref={footerRef}
        id="contact"
        className="relative px-6 py-32 sm:py-40 overflow-hidden bg-[#060608] border-t border-white/5"
        style={{ perspective: '1000px' }}
      >
        {/* 3D Cursor Canvas Background */}
        <Cursor3DCanvas />

        {/* Ambient Cosmic Purple Glow Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] bg-gradient-to-tr from-purple-900/30 via-indigo-900/20 to-cyan-900/10 blur-[170px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl w-full text-center space-y-8">
          
          {/* Floating 3D Display Headline (Styles merged cleanly into one object) */}
          <motion.h2
            style={{
              rotateX,
              opacity,
              transformStyle: 'preserve-3d',
              fontSize: 'clamp(3rem, 10vw, 130px)',
            }}
            className="hero-heading font-black uppercase leading-none tracking-tight text-white/95"
          >
            Let&apos;s Talk
          </motion.h2>

          {/* 3D Word-by-Word Subtitle Reveal */}
          <div className="flex justify-center pt-2">
            <ScrollTextReveal
              text="Have a resilient system to build? Let's engineer something great together."
              className="max-w-xl text-lg sm:text-xl md:text-2xl font-light tracking-wide text-zinc-300"
            />
          </div>

          {/* Floating CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-6 flex justify-center"
          >
            <ContactButton label="Contact Me" />
          </motion.div>

          {/* Copyright Notice */}
          <p className="pt-16 text-xs font-mono uppercase tracking-widest text-zinc-500">
            © {new Date().getFullYear()} Anish Bharat — Software Engineer
          </p>

        </div>
      </footer>
    </main>
  )
}