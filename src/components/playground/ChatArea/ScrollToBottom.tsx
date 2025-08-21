'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type React from 'react'
import { useStickToBottomContext } from 'use-stick-to-bottom'

import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

const ScrollToBottom: React.FC = () => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext()

  return (
    <AnimatePresence>
      {!isAtBottom && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="-translate-x-1/2 absolute bottom-4 left-1/2"
          exit={{ opacity: 0, y: 20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Button
            className="border border-border bg-background text-primary shadow-md transition-shadow duration-300 hover:bg-background-secondary"
            onClick={() => scrollToBottom()}
            size="icon"
            type="button"
            variant="secondary"
          >
            <Icon size="xs" type="arrow-down" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToBottom
