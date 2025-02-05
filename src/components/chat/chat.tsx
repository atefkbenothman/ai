"use client"

import { useChat } from "@/hooks/use-chat"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { MessageList } from "@/components/chat/message-list"
import { type ChatCategory } from "@/lib/ai/chat-types"
import { type ObjectSchemaType } from "@/lib/ai/schemas"
import { type CoreMessage } from "ai"

type ChatProps = {
  model: string
  initialMessages: CoreMessage[]
  initialChatType: ChatCategory
  initialSchemaType: ObjectSchemaType
}

export function Chat({ model, initialMessages, initialChatType, initialSchemaType }: ChatProps) {
  const {
    messages,
    chatType,
    schemaType,
    addMessage,
    setChatType,
    setSchemaType
  } = useChat({
    initialMessages,
    initialChatType,
    initialSchemaType
  })

  return (
    <div className="no-scrollbar flex h-full max-w-full flex-col overflow-x-auto rounded-md border-[1.5px]">
      <ChatHeader
        model={model}
        setChatType={setChatType}
        setSchemaType={setSchemaType}
      />
      <Separator />
      <MessageList
        messages={messages}
        chatType={chatType}
        schemaType={schemaType}
      />
      <ChatInput addMessage={addMessage} />
    </div>
  )
}
