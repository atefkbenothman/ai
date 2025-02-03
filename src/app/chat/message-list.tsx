"use client"

import { type CoreMessage } from "ai"
import { useEffect, useRef } from "react"
import { AssistantMessage, UserMessage } from "@/app/chat/message"

type MessageListProps = {
  messages: CoreMessage[]
}

export function MessageList({ messages }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const end = endRef.current

    if (container && end) {
      const observer = new MutationObserver(() => {
        end.scrollIntoView({ behavior: "instant", block: "end" })
      })
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      return () => observer.disconnect()
    }
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
          return <AssistantMessage key={idx} message={message} />
        }
      })}
      <div ref={endRef} className="invisible" />
    </div>
  )
}
