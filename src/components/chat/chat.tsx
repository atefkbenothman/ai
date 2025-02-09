"use client"

import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { MessageList } from "@/components/chat/message-list"

export function Chat() {
  return (
    <div>
      <ChatHeader />
      <Separator className="h-[0.09rem]" />
      <MessageList />
      <ChatInput />
    </div>
  )
}
