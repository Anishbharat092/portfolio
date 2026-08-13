'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useContact } from '@/components/ContactProvider'

export default function Navbar() {
  const { openContact } = useContact()
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('about')

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
  ]

  // 1. Listen for background scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Active Section Scroll Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Triggers active state when section hits middle viewport
      threshold: 0,
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-5 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none"
    >
      {/* Dynamic Glass Pill Bar Container */}
      <nav
        className={`pointer-events-auto relative flex items-center justify-between w-full max-w-3xl px-3.5 py-2.5 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'border-white/20 bg-[#0c0c12]/85 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
            : 'border-white/15 bg-[#0c0c12]/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
        }`}
      >
        {/* Subtle Top Metallic Edge Highlight */}
        <div className="absolute inset-x-0 -top-px h-px rounded-full bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

        {/* Glowing Logo Badge */}
        <a href="#" aria-label="Home" className="flex items-center pl-1 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-purple-400 text-xs font-bold tracking-wider text-white shadow-[0_0_16px_rgba(168,85,247,0.5)] group-hover:scale-105 transition-transform duration-200">
            AB
          </span>
        </a>

        {/* Navigation Links with Smooth Moving 3D Glass Pill */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-300 rounded-full ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {/* 3D Moving Glass Pill Capsule */}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_4px_20px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            )
          })}
        </div>

        {/* High-Contrast Action Button */}
        <button
          onClick={openContact}
          className="relative group overflow-hidden rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all duration-300 hover:bg-zinc-100 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Contact</span>
        </button>
      </nav>
    </motion.header>
  )
}