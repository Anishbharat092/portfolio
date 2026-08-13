import type { Metadata, Viewport } from 'next'
import { Kanit } from 'next/font/google'
import ContactProvider from '@/components/ContactProvider'
import './globals.css'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kanit',
})

export const metadata: Metadata = {
  title: 'Anish Bharat — Software Engineer',
  description:
    'Anish Bharat — Full-Stack Software Engineer specializing in backend architecture, REST APIs & database systems.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0C0C0C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${kanit.variable} dark`} 
      style={{ background: '#0C0C0C' }}
      suppressHydrationWarning
    >
      <body 
        className="antialiased" 
        style={{ fontFamily: 'var(--font-kanit), sans-serif', background: '#0C0C0C' }}
        suppressHydrationWarning
      >
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}