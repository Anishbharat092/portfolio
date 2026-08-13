'use client'

import { motion } from 'motion/react'

// Syntax color palette
const c = {
  key: '#B600A8', // keywords / decorators
  fn: '#7BB4FF', // functions / methods
  type: '#4FD1C5', // types / classes
  str: '#C3E88D', // strings
  var: '#D7E2EA', // identifiers
  mut: '#8B99A6', // punctuation / muted
  cmt: '#646973', // comments
}

type Tok = { t: string; c: string }

// Express / NestJS style auth controller
const lines: Tok[][] = [
  [{ t: '@Controller', c: c.key }, { t: '(', c: c.mut }, { t: "'auth'", c: c.str }, { t: ')', c: c.mut }],
  [{ t: 'export class ', c: c.key }, { t: 'AuthController', c: c.type }, { t: ' {', c: c.mut }],
  [{ t: '  @Post', c: c.key }, { t: '(', c: c.mut }, { t: "'login'", c: c.str }, { t: ')', c: c.mut }],
  [
    { t: '  async ', c: c.key },
    { t: 'login', c: c.fn },
    { t: '(', c: c.mut },
    { t: 'dto', c: c.var },
    { t: ': ', c: c.mut },
    { t: 'LoginDto', c: c.type },
    { t: ') {', c: c.mut },
  ],
  [
    { t: '    const ', c: c.key },
    { t: 'user', c: c.var },
    { t: ' = await ', c: c.key },
    { t: 'db', c: c.var },
    { t: '.', c: c.mut },
    { t: 'query', c: c.fn },
    { t: '(dto.email)', c: c.mut },
  ],
  [
    { t: '    if ', c: c.key },
    { t: '(!user) ', c: c.mut },
    { t: 'throw new ', c: c.key },
    { t: 'Unauthorized', c: c.type },
    { t: '()', c: c.mut },
  ],
  [
    { t: '    const ', c: c.key },
    { t: 'token', c: c.var },
    { t: ' = ', c: c.mut },
    { t: 'jwt', c: c.var },
    { t: '.', c: c.mut },
    { t: 'sign', c: c.fn },
    { t: '({ sub: user.id })', c: c.mut },
  ],
  [
    { t: '    return ', c: c.key },
    { t: '{ token, user }', c: c.mut },
  ],
  [{ t: '  }', c: c.mut }],
  [{ t: '}', c: c.mut }],
]

export default function CodeTerminal() {
  return (
    <div className="relative">
      {/* Ambient purple glow */}
      <div
        className="absolute -z-10 inset-0 rounded-full bg-purple-900/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="rounded-2xl border border-[#D7E2EA]/20 bg-[#18181B]/80 p-5 shadow-2xl backdrop-blur-md sm:p-6">
        {/* macOS window controls */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] font-light lowercase tracking-wide text-[#646973]">
            auth.controller.ts
          </span>
        </div>

        {/* Code body - Valid <div> nesting with font-mono & whitespace-pre */}
        <div className="overflow-hidden font-mono text-[11px] leading-relaxed sm:text-[13px]">
          <div>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                className="whitespace-pre"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.18, duration: 0.35 }}
              >
                {line.map((tok, j) => (
                  <span key={j} style={{ color: tok.c }}>
                    {tok.t}
                  </span>
                ))}
                {i === lines.length - 1 && (
                  <motion.span
                    className="ml-1 inline-block h-3 w-[7px] translate-y-[1px] bg-[#B600A8]"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}