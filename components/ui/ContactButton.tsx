'use client'

import { useContact } from '@/components/ContactProvider'

interface ContactButtonProps {
  label?: string
  className?: string
}

export default function ContactButton({ label = 'Contact Me', className }: ContactButtonProps) {
  const { openContact } = useContact()

  return (
    <button
      type="button"
      onClick={openContact}
      className={`group inline-flex items-center justify-center rounded-full px-6 py-3 sm:px-8 sm:py-4 text-[#F2E9F5] uppercase tracking-widest text-xs sm:text-sm font-medium transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] ${className ?? ''}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.45), 0 8px 30px rgba(182,0,168,0.25)',
      }}
    >
      {label}
    </button>
  )
}
