'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToasterProps {
  toasts?: Toast[]
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
}

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export function Toaster({ position = 'top-right' }: ToasterProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Глобальная функция для добавления тостов
  useEffect(() => {
    const addToast = (message: string, type: Toast['type'] = 'info', duration = 5000) => {
      const id = Math.random().toString(36).substr(2, 9)
      const toast: Toast = { id, message, type, duration }

      setToasts(prev => [...prev, toast])

      if (duration > 0) {
        setTimeout(() => removeToast(id), duration)
      }

      return id
    }

    // Добавляем глобальную функцию
    ;(window as any).showToast = addToast

    return () => {
      delete (window as any).showToast
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className={`fixed z-50 ${getPositionClasses(position)}`}>
      <div className="space-y-2">
        {toasts.map(toast => {
          const Icon = toastIcons[toast.type]

          return (
            <div
              key={toast.id}
              className={`
                max-w-sm w-full p-4 rounded-lg border shadow-lg transition-all duration-300
                ${toastStyles[toast.type]}
                animate-in slide-in-from-right-2 fade-in-0
              `}
            >
              <div className="flex items-start">
                <Icon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{toast.message}</p>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-auto pl-2 hover:opacity-70 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function getPositionClasses(position: ToasterProps['position']) {
  switch (position) {
    case 'top-right':
      return 'top-4 right-4'
    case 'top-left':
      return 'top-4 left-4'
    case 'bottom-right':
      return 'bottom-4 right-4'
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'top-center':
      return 'top-4 left-1/2 transform -translate-x-1/2'
    case 'bottom-center':
      return 'bottom-4 left-1/2 transform -translate-x-1/2'
    default:
      return 'top-4 right-4'
  }
}