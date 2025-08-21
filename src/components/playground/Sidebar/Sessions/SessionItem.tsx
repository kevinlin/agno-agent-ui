import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { toast } from 'sonner'
import { deletePlaygroundSessionAPI } from '@/api/playground'
import Icon from '@/components/ui/icon'
import useChatActions from '@/hooks/useChatActions'
import useSessionLoader from '@/hooks/useSessionLoader'
import { cn, truncateText } from '@/lib/utils'
import { usePlaygroundStore } from '@/store'
import type { SessionEntry } from '@/types/playground'
import { Button } from '../../../ui/button'
import DeleteSessionModal from './DeleteSessionModal'

type SessionItemProps = SessionEntry & {
  isSelected: boolean
  onSessionClick: () => void
}
const SessionItem = ({
  title,
  session_id,
  isSelected,
  onSessionClick
}: SessionItemProps) => {
  const [agentId] = useQueryState('agent')
  const { getSession } = useSessionLoader()
  const [, setSessionId] = useQueryState('session')
  const { selectedEndpoint, sessionsData, setSessionsData } =
    usePlaygroundStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { clearChat } = useChatActions()

  const handleGetSession = async () => {
    if (agentId) {
      onSessionClick()
      await getSession(session_id, agentId)
      setSessionId(session_id)
    }
  }

  const handleDeleteSession = async () => {
    if (agentId) {
      try {
        const response = await deletePlaygroundSessionAPI(
          selectedEndpoint,
          agentId,
          session_id
        )
        if (response.status === 200 && sessionsData) {
          setSessionsData(
            sessionsData.filter((session) => session.session_id !== session_id)
          )
          clearChat()
          toast.success('Session deleted')
        } else {
          toast.error('Failed to delete session')
        }
      } catch {
        toast.error('Failed to delete session')
      } finally {
        setIsDeleteModalOpen(false)
      }
    }
  }
  return (
    <>
      <div
        className={cn(
          'group flex h-11 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors duration-200',
          isSelected
            ? 'cursor-default bg-primary/10'
            : 'bg-background-secondary hover:bg-background-secondary/80'
        )}
        onClick={handleGetSession}
      >
        <div className="flex flex-col gap-1">
          <h4
            className={cn('font-medium text-sm', isSelected && 'text-primary')}
          >
            {truncateText(title, 20)}
          </h4>
        </div>
        <Button
          className="transform opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            setIsDeleteModalOpen(true)
          }}
          size="icon"
          variant="ghost"
        >
          <Icon size="xs" type="trash" />
        </Button>
      </div>
      <DeleteSessionModal
        isDeleting={false}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteSession}
      />
    </>
  )
}

export default SessionItem
