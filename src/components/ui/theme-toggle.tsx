'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Icon type="sun" size="xs" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-9 w-9 hover:bg-primary/10"
    >
      {theme === 'light' ? (
        <Icon type="moon" size="xs" />
      ) : (
        <Icon type="sun" size="xs" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 