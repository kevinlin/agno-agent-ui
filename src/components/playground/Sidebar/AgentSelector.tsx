'use client'

import { useQueryState } from 'nuqs'
import * as React from 'react'
import { useEffect } from 'react'
import Icon from '@/components/ui/icon'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import useChatActions from '@/hooks/useChatActions'
import { usePlaygroundStore } from '@/store'

export function AgentSelector() {
  const { agents, setMessages, setSelectedModel, setHasStorage } =
    usePlaygroundStore()
  const { focusChatInput } = useChatActions()
  const [agentId, setAgentId] = useQueryState('agent', {
    parse: (value) => value || undefined,
    history: 'push'
  })
  const [, setSessionId] = useQueryState('session')

  // Set the model when the component mounts if an agent is already selected
  useEffect(() => {
    if (agentId && agents.length > 0) {
      const agent = agents.find((agent) => agent.value === agentId)
      if (agent) {
        setSelectedModel(agent.model.provider || '')
        setHasStorage(!!agent.storage)
        if (agent.model.provider) {
          focusChatInput()
        }
      } else {
        setAgentId(agents[0].value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId, agents, setSelectedModel])

  const handleOnValueChange = (value: string) => {
    const newAgent = value === agentId ? '' : value
    const selectedAgent = agents.find((agent) => agent.value === newAgent)
    setSelectedModel(selectedAgent?.model.provider || '')
    setHasStorage(!!selectedAgent?.storage)
    setAgentId(newAgent)
    setMessages([])
    setSessionId(null)
    if (selectedAgent?.model.provider) {
      focusChatInput()
    }
  }

  return (
    <Select
      onValueChange={(value) => handleOnValueChange(value)}
      value={agentId || ''}
    >
      <SelectTrigger className="h-9 w-full rounded-xl border border-primary/15 bg-accent font-medium text-accent-foreground text-xs uppercase">
        <SelectValue placeholder="Select Agent" />
      </SelectTrigger>
      <SelectContent className="border-none bg-background font-dmmono text-primary shadow-lg">
        {agents.map((agent, index) => (
          <SelectItem
            className="cursor-pointer"
            key={`${agent.value}-${index}`}
            value={agent.value}
          >
            <div className="flex items-center gap-3 font-medium text-xs uppercase">
              <Icon size="xs" type={'agent'} />
              {agent.label}
            </div>
          </SelectItem>
        ))}
        {agents.length === 0 && (
          <SelectItem
            className="cursor-not-allowed select-none text-center"
            value="no-agents"
          >
            No agents found
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
