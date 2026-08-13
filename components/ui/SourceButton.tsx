'use client'

import { Code2 } from 'lucide-react'

interface SourceButtonProps {
  href?: string
  label?: string
  className?: string
}

export default function SourceButton({
  href = 'https://github.com/Anishbharat092',
  label = 'Source Code',
  className,
}: SourceButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-4 py-2 sm:px-5 sm:py-2.5 text-[#D7E2EA] uppercase tracking-wider text-xs sm:text-sm font-medium transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className ?? ''}`}
    >
      <Code2 className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  )
}
