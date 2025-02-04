"use client"

import { type CoreMessage } from "ai"
import { MessageList } from "@/components/chat/message-list"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { useChat } from "@/hooks/use-chat"


type ChatProps = {
  model: string
}

export function Chat({ model }: ChatProps) {
  const { messages, addMessage } = useChat()

  return (
    <div className="no-scrollbar flex h-full max-w-full flex-col overflow-x-auto rounded-md border-[1.5px]">
      <ChatHeader model={model} />
      <Separator />
      <MessageList messages={messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  )
}
