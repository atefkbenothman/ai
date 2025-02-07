"use client"

import { useEffect, useRef } from "react"
import { useShallow } from "zustand/react/shallow"
import {
  AssistantMessage,
  CodeSnippetBlock,
  UserMessage,
} from "@/components/chat/message"
import { useChat } from "@/lib/stores/chat-store"

export function MessageList() {
  const { messages, chatType, schemaType } = useChat(
    useShallow((state) => ({
      messages: state.messages,
      chatType: state.chatType,
      schemaType: state.schemaType,
    })),
  )

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
