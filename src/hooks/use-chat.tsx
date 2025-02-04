"use client"

import { CoreMessage } from "ai"
import { useEffect, useState } from "react"
import { AIResponse, chat, getObject } from "@/server/ai/actions"


type ChatType = "chat" | "object"

const chatTypes = {
  "chat": chat,
  "object": getObject
}

export function useChat() {
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [chatType, setChatType] = useState<ChatType>("chat")

  useEffect(() => {
    const lastMessage = messages.at(-1)
    // if last message was created by the user, generate response from ai
    if (lastMessage?.role === "user") {
      sendChat(messages, chatTypes[chatType])
    }
  }, [messages])

  const addMessage = (message: CoreMessage) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const sendChat = async (messages: CoreMessage[], chatFn: (messages: CoreMessage[]) => Promise<AIResponse>) => {
    try {
      // add empty message
      // we will update the content of this message with streamed output from ai
      addMessage({ role: "assistant", content: "" })
      // get streamed response from ai
      let fullResponse = ""
      const { success, stream } = await chatFn(messages)
      if (success && stream) {
        const reader = stream.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }
          fullResponse += value
          setMessages((prevMessages) => {
            const allMessages = prevMessages.slice(0, -1)
            allMessages.push({ role: "assistant", content: fullResponse })
            return allMessages
          })
        }
      }
    } catch (err) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          role: "assistant",
          content: `I encountered an error with your request: \n${err}`
        }
      ])
    }
  }

  return {
    messages,
    chatType,
    setChatType,
    addMessage
  }
}