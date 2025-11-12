import type { Metadata } from 'next'
import './globals.css'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import InstallPwaPrompt from '@/components/InstallPwaPrompt'

export const metadata: Metadata = {
  title: 'Band FM - Rádio Online',
  description: 'Band FM - A sua rádio online com as melhores notícias, programação e promoções',
  icons: {
    icon: '/logo-bandfm.png',
    apple: '/logo-bandfm.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bandUrl = process.env.NEXT_PUBLIC_BAND_URL || '/'
  return (
    <html lang="pt-BR">
      <body>
        <ServiceWorkerRegister />
        <InstallPwaPrompt />
        {children}
      </body>
    </html>
  )
}



