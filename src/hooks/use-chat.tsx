"use client"

import { CoreMessage } from "ai"
import { useEffect, useState } from "react"
import { chat, getObject } from "@/server/ai/actions"
import { ObjectSchemaType } from "@/lib/schemas"

export type ChatType = "chat" | "object"

export function useChat() {
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [chatType, setChatType] = useState<ChatType>("object")
  const [schemaType, setSchemaType] = useState<ObjectSchemaType>("snippets")

  useEffect(() => {
    const lastMessage = messages.at(-1)
    // if last message was created by the user, generate response from ai
    if (lastMessage?.role === "user") {
      switch (chatType) {
        case "chat":
          sendChat(messages)
          break
        case "object":
          sendObject(messages, schemaType)
          break
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  const addMessage = (message: CoreMessage) => {
    setMessages((prevMessages) => [...prevMessages, message])
  }

  const sendChat = async (messages: CoreMessage[]) => {
    try {
      // add empty message
      // we will update the content of this message with streamed output from ai
      addMessage({ role: "assistant", content: "" })
      // get streamed response from ai
      let fullResponse = ""
      const { success, stream } = await chat(messages)
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
          content: `I encountered an error with your request: \n${err}`,
        },
      ])
    }
  }

  const sendObject = async (
    messages: CoreMessage[],
    schemaType: ObjectSchemaType,
  ) => {
    try {
      // add empty message
      // we will update the content of this message with streamed output from ai
      addMessage({ role: "assistant", content: "" })
      // get streamed response from ai
      const { success, stream } = await getObject(messages, schemaType)
      if (success && stream) {
        const reader = stream.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }
          const parsedResponse = value
          setMessages((prevMessages) => {
            const allMessages = prevMessages.slice(0, -1)
            allMessages.push({ role: "assistant", content: parsedResponse })
            return allMessages
          })
        }
      }
    } catch (err) {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          role: "assistant",
          content: `I encountered an error with your request: \n${err}`,
        },
      ])
    }
  }

  return {
    messages,
    addMessage,
    chatType,
    setChatType,
    schemaType,
    setSchemaType,
  }
}
