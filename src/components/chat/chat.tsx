"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { MessageList } from "@/components/chat/message-list"

export function Chat() {
  return (
    <div className="no-scrollbar flex h-full max-w-full flex-col overflow-x-auto rounded-sm border-[1.5px]">
      <ChatHeader />
      <Separator />
      <MessageList />
      <ChatInput />
    </div>
  )
}
