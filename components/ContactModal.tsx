'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { X, Loader2, CheckCircle2 } from 'lucide-react'

interface ContactModalProps {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const firstFieldRef = useRef<HTMLInputElement>(null)

  useEffect(() => setMounted(true), [])

  // Lock body scroll + focus first field when open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstFieldRef.current?.focus(), 120)
    return () => {
      document.body.style.overflow = prev
      clearTimeout(t)
    }
  }, [open])

  // Reset transient state whenever the modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStatus('idle')
        setErrorMsg('')
      }, 250)
      return () => clearTimeout(t)
    }
  }, [open])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus('error')
        setErrorMsg(json?.error ?? 'Failed to send message. Please try again.')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  if (!mounted) return null

  const inputClass =
    'w-full rounded-2xl bg-[#1A1A1A] px-5 py-4 text-[#F2E9F5] placeholder:text-[#646973] border border-[#D7E2EA]/10 outline-none transition-colors duration-200 focus:border-[#B600A8]'

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-lg rounded-3xl border border-[#D7E2EA]/20 bg-[#121212]/90 p-8 shadow-2xl backdrop-blur-xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close contact form"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#8B99A6] transition-colors hover:bg-white/5 hover:text-[#F2E9F5]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-[#B600A8]" aria-hidden="true" />
                <h3 className="hero-heading text-2xl font-black uppercase tracking-tight">
                  Message Sent Successfully!
                </h3>
                <p className="max-w-sm text-sm font-light text-[#8B99A6]">
                  Thanks for reaching out. Anish will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#F2E9F5]"
                  style={{
                    background:
                      'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="hero-heading mb-1 text-3xl font-black uppercase tracking-tight">
                  Get In Touch
                </h3>
                <p className="mb-6 text-sm font-light uppercase tracking-wide text-[#8B99A6]">
                  Let&apos;s build something resilient together.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-medium uppercase tracking-widest text-[#8B99A6]"
                    >
                      Name
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      maxLength={200}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-medium uppercase tracking-widest text-[#8B99A6]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-medium uppercase tracking-widest text-[#8B99A6]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={5000}
                      placeholder="Tell me about your project..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-[#ff6b6b]" role="alert">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest text-[#F2E9F5] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                    style={{
                      background:
                        'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow:
                        'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -2px 6px rgba(0,0,0,0.45), 0 8px 30px rgba(182,0,168,0.25)',
                    }}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
