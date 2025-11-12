import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Band FM Livramento',
    short_name: 'Band FM',
    description: 'Rádio Band FM Livramento - web app responsiva',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: '/logo-bandfm.png',
        type: 'image/png',
        sizes: 'any',
        purpose: 'any',
      },
    ],
  }
}