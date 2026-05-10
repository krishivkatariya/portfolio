import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Krishiv Katariya | Software Engineer',
  description: 'Computer Science student and aspiring software engineer. Explore my portfolio, projects, skills, and professional experience.',
  keywords: ['Software Engineer', 'Computer Science', 'Full Stack Developer', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Krishiv Katariya' }],
  openGraph: {
    title: 'Krishiv Katariya | Software Engineer',
    description: 'Computer Science student and aspiring software engineer passionate about building impactful software.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishiv Katariya | Software Engineer',
    description: 'Computer Science student and aspiring software engineer passionate about building impactful software.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
