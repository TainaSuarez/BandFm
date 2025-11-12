'use client'

import { useEffect, useState } from 'react'

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Evitar mostrar repetidamente si el usuario ya lo cerró recientemente
    const dismissedAt = localStorage.getItem('pwaInstallPromptDismissedAt')
    const DAY_MS = 24 * 60 * 60 * 1000
    const canShowAgain = !dismissedAt || Date.now() - Number(dismissedAt) > DAY_MS

    const handler = (e: Event) => {
      e.preventDefault()
      // Guardar el evento para usarlo al hacer click en "Instalar"
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      if (canShowAgain) setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler as EventListener)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler as EventListener)
    }
  }, [])

  const onInstall = async () => {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') {
        setVisible(false)
        setDeferredPrompt(null)
      } else {
        // Si se cancela, ocultamos y no molestamos por 24h
        localStorage.setItem('pwaInstallPromptDismissedAt', String(Date.now()))
        setVisible(false)
      }
    } catch (err) {
      // Si falla el prompt, ocultar y permitir intentar más tarde
      setVisible(false)
    }
  }

  const onClose = () => {
    localStorage.setItem('pwaInstallPromptDismissedAt', String(Date.now()))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-20 sm:bottom-6 z-50 px-4 sm:px-6">
      <div className="mx-auto max-w-md rounded-xl shadow-lg border border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">Instalar en el celular</h3>
              <p className="mt-1 text-sm text-gray-700">
                ¿Quieres instalar Band FM como app en tu teléfono para un acceso más rápido?
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Más tarde
            </button>
            <button
              type="button"
              onClick={onInstall}
              className="inline-flex h-10 items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              Instalar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}