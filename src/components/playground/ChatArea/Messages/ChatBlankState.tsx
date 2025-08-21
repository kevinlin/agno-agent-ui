'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'
import Icon from '@/components/ui/icon'
import type { IconType } from '@/components/ui/icon/types'

const EXTERNAL_LINKS = {
  documentation: 'https://agno.link/agent-ui',
  playground: 'https://app.agno.com/playground/agents',
  agno: 'https://agno.com'
}

const TECH_ICONS = [
  {
    type: 'nextjs' as IconType,
    position: 'left-0',
    link: 'https://nextjs.org',
    name: 'Next.js',
    zIndex: 10
  },
  {
    type: 'shadcn' as IconType,
    position: 'left-[15px]',
    link: 'https://ui.shadcn.com',
    name: 'shadcn/ui',
    zIndex: 20
  },
  {
    type: 'tailwind' as IconType,
    position: 'left-[30px]',
    link: 'https://tailwindcss.com',
    name: 'Tailwind CSS',
    zIndex: 30
  }
]

interface ActionButtonProps {
  href: string
  variant?: 'primary'
  text: string
}

const ActionButton = ({ href, variant, text }: ActionButtonProps) => {
  const baseStyles =
    'px-4 py-2 text-sm transition-colors font-dmmono tracking-tight'
  const variantStyles = {
    primary: 'border border-border hover:bg-neutral-800 rounded-xl'
  }

  return (
    <Link
      className={`${baseStyles} ${variant ? variantStyles[variant] : ''}`}
      href={href}
      target="_blank"
    >
      {text}
    </Link>
  )
}

const ChatBlankState = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  // Animation variants for the icon
  const iconVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 10,
        mass: 0.5
      }
    },
    exit: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        mass: 0.6
      }
    }
  }

  // Animation variants for the tooltip
  const tooltipVariants: Variants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section
      aria-label="Welcome message"
      className="flex flex-col items-center text-center font-geist"
    >
      <div className="flex max-w-3xl flex-col gap-y-8">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="font-[600] text-3xl tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-center gap-x-2 whitespace-nowrap font-medium">
            <span className="flex items-center font-[600]">
              This is an open-source
            </span>
            <span className="inline-flex translate-y-[10px] scale-125 items-center transition-transform duration-200 hover:rotate-6">
              <Link
                className="cursor-pointer"
                href={EXTERNAL_LINKS.agno}
                rel="noopener"
                target="_blank"
              >
                <Icon size="default" type="agno-tag" />
              </Link>
            </span>
            <span className="flex items-center font-[600]">
              Agent UI, built with
            </span>
            <span className="inline-flex translate-y-[5px] scale-125 items-center">
              <div className="relative ml-2 h-[40px] w-[90px]">
                {TECH_ICONS.map((icon) => (
                  <motion.div
                    animate={hoveredIcon === icon.type ? 'hover' : 'exit'}
                    className={`absolute ${icon.position} top-0`}
                    initial="initial"
                    key={icon.type}
                    onHoverEnd={() => setHoveredIcon(null)}
                    onHoverStart={() => setHoveredIcon(icon.type)}
                    style={{ zIndex: icon.zIndex }}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <Link
                      className="relative block cursor-pointer"
                      href={icon.link}
                      rel="noopener"
                      target="_blank"
                    >
                      <div>
                        <Icon size="default" type={icon.type} />
                      </div>
                      <motion.div
                        animate={
                          hoveredIcon === icon.type ? 'visible' : 'hidden'
                        }
                        className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 mb-1 transform whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-primary text-xs"
                        initial="hidden"
                        variants={tooltipVariants}
                      >
                        {icon.name}
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </span>
          </div>
          <p>For the full experience, visit the Agent Playground.</p>
        </motion.h1>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ActionButton
            href={EXTERNAL_LINKS.documentation}
            text="GO TO DOCS"
            variant="primary"
          />
          <ActionButton
            href={EXTERNAL_LINKS.playground}
            text="VISIT AGENT PLAYGROUND"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBlankState
