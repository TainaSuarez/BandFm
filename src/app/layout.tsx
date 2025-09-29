import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Band FM - Rádio Online',
  description: 'Band FM - A sua rádio online com as melhores notícias, programação e promoções',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}



