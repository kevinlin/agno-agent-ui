'use client'
import { Suspense } from 'react'
import { NoSSR } from '@/components/NoSSR'
import { ChatArea } from '@/components/playground/ChatArea'
import Sidebar from '@/components/playground/Sidebar/Sidebar'

export default function Home() {
  return (
    <NoSSR
      fallback={
        <div className="flex h-screen items-center justify-center bg-background/80">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen bg-background/80">
          <Sidebar />
          <ChatArea />
        </div>
      </Suspense>
    </NoSSR>
  )
}
