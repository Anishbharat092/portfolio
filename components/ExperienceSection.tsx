'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import Cursor3DCanvas from './ui/Cursor3DCanvas'
import ScrollTextReveal from './ui/ScrollTextReveal'

interface Deliverable {
  title: string
  body: string
  tags: string[]
}

interface Experience {
  role: string
  company: string
  location: string
  period: string
  isCurrent?: boolean
  deliverables: Deliverable[]
}

const experiences: Experience[] = [
  {
    role: 'Full Stack Engineer',
    company: 'CodeMerit',
    location: 'Remote',
    period: 'MAY 2026 – PRESENT',
    isCurrent: true,
    deliverables: [
      {
        title: 'End-to-End Assessment Engine',
        body: 'Designed database schemas (Interview, Assessment Session, Skill Rating) and shipped 5 production REST API endpoints for scheduling, SME assignment, and report generation.',
        tags: ['REST APIs', 'MongoDB', 'Schema Design', 'Express/NestJS'],
      },
      {
        title: '5-State Workflow Pipeline',
        body: 'Built role-based permission management (Interview Manager & SME tiers) with status tracking (Scheduled, Assigned, Started, Completed, Declined) and decline handling.',
        tags: ['RBAC', 'State Machines', 'Workflow Pipelines'],
      },
      {
        title: 'API Resilience & Security',
        body: 'Integrated a throttler-based rate-limiting layer across Express/NestJS endpoints to prevent abuse under high load.',
        tags: ['Rate Limiting', 'Throttling', 'API Security'],
      },
      {
        title: 'Zero-Data-Loss OAuth Flow',
        body: 'Co-developed Google & LinkedIn OAuth authentication with server-side token verification and in-memory wizard data preservation.',
        tags: ['OAuth 2.0', 'JWT', 'Security', 'State Persistence'],
      },
      {
        title: 'UI Modernization',
        body: 'Migrated legacy Bootstrap UI components to Tailwind CSS to improve design consistency and maintainability.',
        tags: ['Tailwind CSS', 'Refactoring', 'React'],
      },
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'Vitaris Air Ambulance Services Pvt Ltd',
    location: 'Remote',
    period: 'OCT 2025 – APR 2026',
    isCurrent: false,
    deliverables: [
      {
        title: 'End-to-End Dispatch Platform',
        body: 'Architected and built a patient booking and dispatch management platform end-to-end as the sole engineer, managing booking requests, patient records, and real-time tracking across air, train, and road ambulance operations.',
        tags: ['Full Stack', 'Node.js', 'Express.js', 'MongoDB', 'React.js'],
      },
      {
        title: 'Operations Admin Dashboard',
        body: 'Engineered a centralized dashboard enabling operations staff to triage incoming medical requests, assign transport assets, and trace patient journeys from initial intake through final handover.',
        tags: ['Admin Portal', 'Resource Dispatch', 'Workflow Management', 'React'],
      },
      {
        title: 'Secure Patient & Transport Records',
        body: 'Modeled database schemas and built backend REST APIs to manage sensitive patient intake records, operational logs, and multi-tier ambulance dispatch workflows.',
        tags: ['RESTful APIs', 'Database Design', 'Data Integrity', 'CRUD'],
      },
      {
        title: 'Complete SDLC & Founder Collaboration',
        body: 'Owned the full product development lifecycle directly with company founders and operational teams, translating frontline clinical transport requirements into a live production system.',
        tags: ['System Design', 'Agile', 'Requirements Gathering', 'Production Deployment'],
      },
    ],
  },
]

function ExperienceCard({ exp }: { exp: Experience }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1])
  const glowOpacity = useTransform(scrollYProgress, [0.5, 1], [0.1, 0.4])

  return (
    <div ref={cardRef}>
      <motion.article
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
        className="group relative rounded-3xl border border-white/15 bg-[#121216]/90 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] space-y-10 overflow-hidden transition-colors duration-500 hover:border-purple-500/40"
      >
        {/* Dynamic Ambient Corner Glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-500/30 blur-3xl pointer-events-none"
        />

        {/* Role Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              {exp.isCurrent ? (
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              ) : (
                <span className="flex h-2 w-2 rounded-full bg-purple-400/80" />
              )}
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                {exp.role}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-purple-300 font-medium">
                <Briefcase className="h-4 w-4" />
                {exp.company}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="h-4 w-4" />
                {exp.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-1.5 text-xs font-mono text-zinc-300 backdrop-blur-sm self-start sm:self-auto">
            <Calendar className="h-3.5 w-3.5 text-purple-400" />
            <span>{exp.period}</span>
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="grid gap-8 md:grid-cols-2 relative z-10">
          {exp.deliverables.map((d, i) => (
            <div key={d.title} className="flex gap-4 group/item">
              <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg border border-purple-500/20 bg-purple-500/10 text-xs font-mono font-bold text-purple-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="space-y-2">
                <h4 className="text-lg font-medium text-white group-hover/item:text-purple-300 transition-colors">
                  {d.title}
                </h4>

                <ScrollTextReveal
                  text={d.body}
                  className="text-sm font-light leading-relaxed text-zinc-300"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {d.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono rounded-md border border-white/5 bg-zinc-900/60 px-2 py-0.5 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.article>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative px-6 py-28 sm:px-10 md:px-16 bg-[#0A0A0C] text-zinc-100 overflow-hidden min-h-screen"
      style={{ perspective: '1200px' }}
    >
      <Cursor3DCanvas />

      {/* Tech Background Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] bg-gradient-to-tr from-purple-900/20 via-indigo-900/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl w-full space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-4xl font-light tracking-tight text-white sm:text-6xl font-sans">
            Work{' '}
            <span className="font-semibold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Stacked Experience Cards */}
        <div className="space-y-14">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.company} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  )
}