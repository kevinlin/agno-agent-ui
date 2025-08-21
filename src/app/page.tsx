'use client'
import Sidebar from '@/components/playground/Sidebar/Sidebar'
import { ChatArea } from '@/components/playground/ChatArea'
import { NoSSR } from '@/components/NoSSR'
import { Suspense } from 'react'

export default function Home() {
  return (
    <NoSSR fallback={
      <div className="flex h-screen bg-background/80 items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    }>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen bg-background/80">
          <Sidebar />
          <ChatArea />
        </div>
      </Suspense>
    </NoSSR>
  )
}
