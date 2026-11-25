import localFont from 'next/font/local'
import type { ReactNode } from 'react'

import './globals.css'

const poppins = localFont({
  src: [
    { path: './fonts/poppins-regular.woff2', weight: '400' },
    { path: './fonts/poppins-semibold.woff2', weight: '600' },
  ],
  display: 'swap',
  fallback: ['Avenir Next', 'system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
