"use client"

import { JSX, useEffect, useState } from "react"
import { ChatForm } from "@/app/chat/chat-form"
import { Message, MessageList } from "@/app/chat/message-list"
import { streamChat } from "@/actions/stream-chat"
import { type CoreMessage } from "ai"

export default function ChatContainer() {
  const [messages, setMessages] = useState<JSX.Element[]>([
    <Message
      key={1}
      message={{ role: "system", content: "You are a python expert" }}
    />,
  ])

  useEffect(() => {
    getResponse(messages)
  }, [messages])

  const addMessage = (message: CoreMessage, loading?: boolean) => {
    const newMessage = <Message message={message} isLoading={loading} />
    setMessages((prevMessages) => [...prevMessages, newMessage])
    return newMessage
  }

  const getMessageCoreMessages = () => {
    return messages.map((message) => {
      return message?.props.message
    })
  }

  const getResponse = async (messages: JSX.Element[]) => {
    // check if last response was from a user, if it was then generate a response from ai
    if (messages.at(-1)?.props.message.role === "user") {
      addMessage({ role: "assistant", content: "" }, true)
      const msgs = getMessageCoreMessages()
      const { success, readableStream } = await streamChat(msgs)
      let fullResponse = ""
      if (success && readableStream) {
        const reader = readableStream.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          fullResponse += value
          // update the last message using state
          setMessages((prevMessages) => {
            const updatedMessages = prevMessages.slice(0, -1)
            updatedMessages.push(
              <Message
                key={prevMessages.length}
                message={{ role: "assistant", content: fullResponse.trim() }}
                isLoading={false}
              />,
            )
            return updatedMessages
          })
        }
      }
    }
  }

  return (
    <div className="no-scrollbar flex h-full w-full flex-col rounded-md border border-white/10">
      <MessageList messages={messages} />
      <ChatForm addMessage={addMessage} />
    </div>
  )
}
