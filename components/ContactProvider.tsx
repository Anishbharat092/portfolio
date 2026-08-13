'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import ContactModal from './ContactModal'

interface ContactContextValue {
  isContactOpen: boolean
  openContact: () => void
  closeContact: () => void
}

const ContactContext = createContext<ContactContextValue | null>(null)

export function useContact() {
  const ctx = useContext(ContactContext)
  if (!ctx) {
    throw new Error('useContact must be used within a ContactProvider')
  }
  return ctx
}

export default function ContactProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false)

  const openContact = useCallback(() => setIsContactOpen(true), [])
  const closeContact = useCallback(() => setIsContactOpen(false), [])

  // Global Escape-to-close listener
  useEffect(() => {
    if (!isContactOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContact()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isContactOpen, closeContact])

  return (
    <ContactContext.Provider value={{ isContactOpen, openContact, closeContact }}>
      {children}
      <ContactModal open={isContactOpen} onClose={closeContact} />
    </ContactContext.Provider>
  )
}
