"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { MessageList } from "@/components/chat/message-list"

export function Chat() {
  return (
    <div className="flex h-full flex-col">
      <ChatHeader />
      <Separator className="h-[0.09rem]" />
      <div className="flex-1 overflow-auto">
        <MessageList />
      </div>
      <div className="mt-auto">
        <ChatInput />
      </div>
    </div>
  )
}
