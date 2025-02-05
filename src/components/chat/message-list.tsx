"use client"

import { type CoreMessage } from "ai"
import { useEffect, useRef } from "react"
import {
  AssistantMessage,
  CodeSnippetBlock,
  UserMessage,
} from "@/components/chat/message"
import { ChatCategory } from "@/lib/ai/chat-types"
import { ObjectSchemaType } from "@/lib/ai/schemas"

type MessageListProps = {
  messages: CoreMessage[]
  chatType: ChatCategory
  schemaType: ObjectSchemaType
}

export function MessageList({
  messages,
  chatType,
  schemaType,
}: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "instant", block: "end" })
  }, [messages])

  return (
    <div
      ref={containerRef}
      className="no-scrollbar flex-1 flex-col-reverse space-y-4 overflow-y-auto p-4"
    >
      <AssistantMessage message={{ role: "assistant", content: "Hello!" }} />
      {messages.map((message, idx) => {
        if (message.role === "user") {
          return <UserMessage key={idx} message={message} />
        } else if (message.role === "assistant") {
          if (chatType === "chat") {
            return <AssistantMessage key={idx} message={message} />
          } else if (chatType === "object") {
            return (
              <CodeSnippetBlock
                key={idx}
                message={message}
                schemaType={schemaType}
              />
            )
          }
        }
      })}
      <div ref={endRef} className="invisible" />
    </div>
  )
}
