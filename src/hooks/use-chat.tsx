"use client"

import { CoreMessage } from "ai"
import { useEffect } from "react"
import { chat, getObject } from "@/server/ai/actions"
import { ObjectSchemaType } from "@/lib/ai/schemas"
import { useChatStore } from "@/lib/stores/use-chat-store"

export function useChat() {
  const {
    model,
    messages,
    chatType,
    schemaType,
    // isProcessing,
    // setMessages,
    addMessage,
    updateLastMessage,
    setChatType,
    setSchemaType,
    // setIsProcessing
  } = useChatStore()

  useEffect(() => {
    // if last message was created by the user, generate response from ai
    const lastMessage = messages.at(-1)
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

  const sendChat = async (messages: CoreMessage[]) => {
    try {
      addMessage({ role: "assistant", content: "" })
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
          updateLastMessage(fullResponse)
        }
      }
    } catch (err) {
      updateLastMessage(`I encountered an error with your request: \n${err}`)
    }
  }

  const sendObject = async (
    messages: CoreMessage[],
    schemaType: ObjectSchemaType,
  ) => {
    try {
      addMessage({ role: "assistant", content: "" })
      const { success, stream } = await getObject(messages, schemaType)
      if (success && stream) {
        const reader = stream.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }
          const parsedResponse = value
          updateLastMessage(parsedResponse)
        }
      }
    } catch (err) {
      updateLastMessage(`I encountered an error with your request: \n${err}`)
    }
  }

  return {
    model,
    messages,
    addMessage,
    chatType,
    setChatType,
    schemaType,
    setSchemaType,
  }
}
