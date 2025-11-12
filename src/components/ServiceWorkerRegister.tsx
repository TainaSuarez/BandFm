'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Sólo registrar en producción o localhost
      const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
      if (isLocalhost || process.env.NODE_ENV === 'production') {
        navigator.serviceWorker
          .register('/sw.js')
          .catch((err) => console.error('SW register failed', err))
      }
    }
  }, [])

  return null
}