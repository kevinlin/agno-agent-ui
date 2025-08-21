'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'
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
      <Button className="h-9 w-9" size="icon" variant="ghost">
        <Icon size="xs" type="sun" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      className="h-9 w-9 hover:bg-primary/10"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size="icon"
      variant="ghost"
    >
      {theme === 'light' ? (
        <Icon size="xs" type="moon" />
      ) : (
        <Icon size="xs" type="sun" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
