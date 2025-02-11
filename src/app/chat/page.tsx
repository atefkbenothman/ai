"use client"

import { PageContent } from "@/components/page-content"
import { Chat } from "@/components/chat/chat"
import { useSidePanel } from "@/lib/stores/side-panel-store"
import { ChatSidePanel } from "@/components/chat/chat-side-panel"

export default function ChatPage() {
  const isOpen = useSidePanel((state) => state.isOpen)
  return (
    <div
      className={`grid ${isOpen ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
    >
      {isOpen && (
        <PageContent>
          <ChatSidePanel />
        </PageContent>
      )}
      <PageContent>
        <Chat />
      </PageContent>
    </div>
  )
}
