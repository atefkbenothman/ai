"use client"

import { useEffect, useState } from "react"
import { type CoreMessage } from "ai"
import { MessageList } from "@/app/chat/message-list"
import { ChatInput } from "@/app/chat/chat-input"
import { Separator } from "@/components/ui/separator"
import { chat } from "@/server/ai/actions"

type ChatProps = {
  model: string
  initialMessages: CoreMessage[]
}

export function Chat({ model, initialMessages }: ChatProps) {
  const [messages, setMessages] = useState<CoreMessage[]>(initialMessages)

  useEffect(() => {
    // if last message was created by the user, generate response from ai
    if (messages.at(-1)?.role === "user") {
      askAI(messages)
    }
  }, [messages])

  const askAI = async (messages: CoreMessage[]) => {
    // create empty message. we will update the content of this message when getting streamed output from server
    createMessage({ role: "assistant", content: "" })
    // get streamed response from ai
    let fullResponse = ""
    const { success, readableStream } = await chat(messages)
    if (success && readableStream) {
      const reader = readableStream.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullResponse += value
        setMessages((prevMessages) => {
          const allMessages = prevMessages.slice(0, -1) // pop out the previous partial message and update it with new partial data
          allMessages.push({ role: "assistant", content: fullResponse.trim() })
          return allMessages
        })
      }
    }
  }

  const createMessage = (message: CoreMessage) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  return (
    <div className="no-scrollbar flex h-full max-w-full flex-col overflow-x-auto rounded-md border-[1.5px]">
      <p className="flex items-center justify-center py-1 font-semibold">
        {model}
      </p>
      <Separator />
      <MessageList messages={messages} />
      <ChatInput createMessage={createMessage} />
    </div>
  )
}
