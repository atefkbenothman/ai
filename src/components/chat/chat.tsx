"use client"

import { useChat } from "@/hooks/use-chat"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatHeader } from "@/components/chat/chat-header"
import { Separator } from "@/components/ui/separator"
import { MessageList } from "@/components/chat/message-list"

export function Chat() {
  const {
    model,
    messages,
    chatType,
    schemaType,
    addMessage,
    setChatType,
    setSchemaType,
  } = useChat()

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
