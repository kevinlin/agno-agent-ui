'use client'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { TextArea } from '@/components/ui/textarea'
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler'
import { usePlaygroundStore } from '@/store'

const ChatInput = () => {
  const { chatInputRef } = usePlaygroundStore()

  const { handleStreamResponse } = useAIChatStreamHandler()
  const [selectedAgent] = useQueryState('agent')
  const [inputMessage, setInputMessage] = useState('')
  const isStreaming = usePlaygroundStore((state) => state.isStreaming)
  const handleSubmit = async () => {
    if (!inputMessage.trim()) return

    const currentMessage = inputMessage
    setInputMessage('')

    try {
      await handleStreamResponse(currentMessage)
    } catch (error) {
      toast.error(
        `Error in handleSubmit: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }

  return (
    <div className="relative mx-auto mb-1 flex w-full max-w-2xl items-end justify-center gap-x-2 font-geist">
      <TextArea
        className="w-full border border-accent bg-primaryAccent px-4 text-primary text-sm focus:border-accent"
        disabled={!selectedAgent}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !e.nativeEvent.isComposing &&
            !e.shiftKey &&
            !isStreaming
          ) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        placeholder={'Ask anything'}
        ref={chatInputRef}
        value={inputMessage}
      />
      <Button
        className="rounded-xl bg-primary p-5 text-primaryAccent"
        disabled={!(selectedAgent && inputMessage.trim()) || isStreaming}
        onClick={handleSubmit}
        size="icon"
      >
        <Icon color="primaryAccent" type="send" />
      </Button>
    </div>
  )
}

export default ChatInput
