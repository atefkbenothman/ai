"use client"

import { CoreMessage } from "ai"
import { chat, getObject } from "@/server/ai/actions"
import { ObjectSchemaType } from "@/lib/ai/schemas"
import { useChatStore } from "@/lib/stores/use-chat-store"
import { useShallow } from "zustand/react/shallow"

export function useChat() {
  const {
    model,
    messages,
    chatType,
    schemaType,
    addMessage,
    updateLastMessage,
    setChatType,
    setSchemaType,
  } = useChatStore(
    useShallow((state) => ({
      model: state.model,
      messages: state.messages,
      chatType: state.chatType,
      schemaType: state.schemaType,
      addMessage: state.addMessage,
      updateLastMessage: state.updateLastMessage,
      setChatType: state.setChatType,
      setSchemaType: state.setSchemaType,
    }))
  )

  const handleAddMessage = (message: CoreMessage) => {
    addMessage(message)
    const newMessages = [...messages, message]
    if (message.role === "user") {
      switch (chatType) {
        case "chat":
          sendChat(newMessages)
          break
        case "object":
          sendObject(newMessages, schemaType)
          break
      }
    }
  }

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
    handleAddMessage,
    chatType,
    setChatType,
    schemaType,
    setSchemaType,
  }
}
