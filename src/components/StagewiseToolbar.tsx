'use client'

import { useEffect } from 'react'

const stagewiseConfig = {
  plugins: []
}

export function StagewiseToolbar() {
  useEffect(() => {
    // Only initialize in development mode
    if (process.env.NODE_ENV === 'development') {
      import('@stagewise/toolbar').then(({ initToolbar }) => {
        initToolbar(stagewiseConfig)
      })
    }
  }, [])

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return null // The toolbar is initialized programmatically
} 