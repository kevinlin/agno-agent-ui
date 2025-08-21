'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { AgentSelector } from '@/components/playground/Sidebar/AgentSelector'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { Skeleton } from '@/components/ui/skeleton'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import useChatActions from '@/hooks/useChatActions'
import { getProviderIcon } from '@/lib/modelProvider'
import { isValidUrl, truncateText } from '@/lib/utils'
import { usePlaygroundStore } from '@/store'
import Sessions from './Sessions'

const ENDPOINT_PLACEHOLDER = 'NO ENDPOINT ADDED'
const SidebarHeader = ({
  isCollapsed,
  onToggleCollapse
}: {
  isCollapsed: boolean
  onToggleCollapse: () => void
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icon size="xs" type="agno" />
      <span className="font-medium text-primary text-xs uppercase">
        Agent UI
      </span>
    </div>
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <Button
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="h-9 w-9 hover:bg-primary/10"
        onClick={onToggleCollapse}
        size="icon"
        type="button"
        variant="ghost"
      >
        <Icon
          className={`transform text-primary transition-transform duration-200 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`}
          size="xs"
          type="sheet"
        />
      </Button>
    </div>
  </div>
)

const NewChatButton = ({
  disabled,
  onClick
}: {
  disabled: boolean
  onClick: () => void
}) => (
  <Button
    className="h-9 w-full rounded-xl bg-primary font-medium text-primary-foreground text-xs hover:bg-primary/80"
    disabled={disabled}
    onClick={onClick}
    size="lg"
  >
    <Icon className="text-primary-foreground" size="xs" type="plus-icon" />
    <span className="uppercase">New Chat</span>
  </Button>
)

const ModelDisplay = ({ model }: { model: string }) => (
  <div className="flex h-9 w-full items-center gap-3 rounded-xl border border-primary/15 bg-accent p-3 font-medium text-muted-foreground text-xs uppercase">
    {(() => {
      const icon = getProviderIcon(model)
      return icon ? <Icon className="shrink-0" size="xs" type={icon} /> : null
    })()}
    {model}
  </div>
)

const Endpoint = () => {
  const {
    selectedEndpoint,
    isEndpointActive,
    setSelectedEndpoint,
    setAgents,
    setSessionsData,
    setMessages
  } = usePlaygroundStore()
  const { initializePlayground } = useChatActions()
  const [isEditing, setIsEditing] = useState(false)
  const [endpointValue, setEndpointValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [, setAgentId] = useQueryState('agent')
  const [, setSessionId] = useQueryState('session')

  useEffect(() => {
    setEndpointValue(selectedEndpoint)
    setIsMounted(true)
  }, [selectedEndpoint])

  const getStatusColor = (isActive: boolean) =>
    isActive ? 'bg-positive' : 'bg-destructive'

  const handleSave = async () => {
    if (!isValidUrl(endpointValue)) {
      toast.error('Please enter a valid URL')
      return
    }
    const cleanEndpoint = endpointValue.replace(/\/$/, '').trim()
    setSelectedEndpoint(cleanEndpoint)
    setAgentId(null)
    setSessionId(null)
    setIsEditing(false)
    setIsHovering(false)
    setAgents([])
    setSessionsData([])
    setMessages([])
  }

  const handleCancel = () => {
    setEndpointValue(selectedEndpoint)
    setIsEditing(false)
    setIsHovering(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleRefresh = async () => {
    setIsRotating(true)
    await initializePlayground()
    setTimeout(() => setIsRotating(false), 500)
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="font-medium text-primary text-xs uppercase">Endpoint</div>
      {isEditing ? (
        <div className="flex w-full items-center gap-1">
          <input
            autoFocus
            className="flex h-9 w-full items-center text-ellipsis rounded-xl border border-primary/15 bg-accent p-3 font-medium text-muted-foreground text-xs"
            onChange={(e) => setEndpointValue(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            value={endpointValue}
          />
          <Button
            className="hover:cursor-pointer hover:bg-transparent"
            onClick={handleSave}
            size="icon"
            variant="ghost"
          >
            <Icon size="xs" type="save" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center gap-1">
          <motion.div
            className="relative flex h-9 w-full cursor-pointer items-center justify-between rounded-xl border border-primary/15 bg-accent p-3 uppercase"
            onClick={() => setIsEditing(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <AnimatePresence mode="wait">
              {isHovering ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key="endpoint-display-hover"
                  transition={{ duration: 0.2 }}
                >
                  <p className="flex items-center gap-2 whitespace-nowrap font-medium text-primary text-xs">
                    <Icon size="xxs" type="edit" /> EDIT ENDPOINT
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-between px-3"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key="endpoint-display"
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-medium text-muted-foreground text-xs">
                    {isMounted
                      ? truncateText(selectedEndpoint, 21) ||
                        ENDPOINT_PLACEHOLDER
                      : 'http://localhost:7777'}
                  </p>
                  <div
                    className={`size-2 shrink-0 rounded-full ${getStatusColor(isEndpointActive)}`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Button
            className="hover:cursor-pointer hover:bg-transparent"
            onClick={handleRefresh}
            size="icon"
            variant="ghost"
          >
            <motion.div
              animate={{ rotate: isRotating ? 360 : 0 }}
              key={isRotating ? 'rotating' : 'idle'}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Icon size="xs" type="refresh" />
            </motion.div>
          </Button>
        </div>
      )}
    </div>
  )
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { clearChat, focusChatInput, initializePlayground } = useChatActions()
  const {
    messages,
    selectedEndpoint,
    isEndpointActive,
    selectedModel,
    hydrated,
    isEndpointLoading
  } = usePlaygroundStore()
  const [isMounted, setIsMounted] = useState(false)
  const [agentId] = useQueryState('agent')
  useEffect(() => {
    setIsMounted(true)
    if (hydrated) initializePlayground()
  }, [selectedEndpoint, initializePlayground, hydrated])
  const handleNewChat = () => {
    clearChat()
    focusChatInput()
  }
  return (
    <motion.aside
      animate={{ width: isCollapsed ? '2.5rem' : '16rem' }}
      className="relative flex h-screen shrink-0 grow-0 flex-col overflow-hidden px-2 py-3 font-dmmono"
      initial={{ width: '16rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div
        animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -20 : 0 }}
        className="w-60 space-y-5"
        initial={{ opacity: 0, x: -20 }}
        style={{
          pointerEvents: isCollapsed ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
        <NewChatButton
          disabled={messages.length === 0}
          onClick={handleNewChat}
        />
        {isMounted && (
          <>
            <Endpoint />
            {isEndpointActive && (
              <>
                <motion.div
                  animate={{ opacity: 1 }}
                  className="flex w-full flex-col items-start gap-2"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className="font-medium text-primary text-xs uppercase">
                    Agent
                  </div>
                  {isEndpointLoading ? (
                    <div className="flex w-full flex-col gap-2">
                      {Array.from({ length: 2 }).map((_, index) => (
                        <Skeleton
                          className="h-9 w-full rounded-xl"
                          key={index}
                        />
                      ))}
                    </div>
                  ) : (
                    <>
                      <AgentSelector />
                      {selectedModel && agentId && (
                        <ModelDisplay model={selectedModel} />
                      )}
                    </>
                  )}
                </motion.div>
                <Sessions />
              </>
            )}
          </>
        )}
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
