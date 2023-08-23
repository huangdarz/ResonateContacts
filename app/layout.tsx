import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resonate Contacts',
  description: 'Responsive contacts application.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
