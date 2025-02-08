import { create } from "zustand"
import { CoreMessage } from "ai"
import { chat, getObject } from "@/server/ai/actions"
import { ObjectSchemaType } from "@/lib/ai/schemas"
import { ChatCategory, CoreMessageExtras } from "@/lib/ai/chat-types"

type ChatState = {
  messages: CoreMessageExtras[]
  chatType: ChatCategory
  schemaType: ObjectSchemaType
  model: string
  addMessage: (message: CoreMessage) => void
  updateLastMessage: (content: string) => void
  setChatType: (type: ChatCategory) => void
  setSchemaType: (schema: ObjectSchemaType) => void
  handleAddMessage: (message: CoreMessage) => void
}

async function sendChat(messages: CoreMessage[], store: ChatState) {
  try {
    store.addMessage({ role: "assistant", content: "" })
    let fullResponse = ""
    const { success, stream } = await chat(messages)

    if (success && stream) {
      const reader = stream.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullResponse += value
        store.updateLastMessage(fullResponse)
      }
    }
  } catch (err) {
    store.updateLastMessage(
      `I encountered an error with your request: \n${err}`,
    )
  }
}

async function sendObject(
  messages: CoreMessage[],
  schemaType: ObjectSchemaType,
  store: ChatState,
) {
  try {
    store.addMessage({ role: "assistant", content: "" })
    const { success, stream } = await getObject(messages, schemaType)

    if (success && stream) {
      const reader = stream.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const parsedResponse = value
        store.updateLastMessage(parsedResponse)
      }
    }
  } catch (err) {
    store.updateLastMessage(
      `I encountered an error with your request: \n${err}`,
    )
  }
}

export const useChat = create<ChatState>((set, get) => ({
  messages: [] as CoreMessageExtras[],
  chatType: "chat" as ChatCategory,
  schemaType: "snippets" as ObjectSchemaType,
  model: "Groq",
  addMessage: (message) => {
    set((state) => ({
      messages: [
        ...state.messages,
        { ...message, chatType: state.chatType, schemaType: state.schemaType },
      ],
    }))
  },
  updateLastMessage: (content) =>
    set((state) => ({
      messages: state.messages.map((msg, index) =>
        index === state.messages.length - 1
          ? {
              role: "assistant",
              content: content,
              chatType: state.chatType,
              schemaType: state.schemaType,
            }
          : msg,
      ),
    })),
  setChatType: (chatType) => set({ chatType }),
  setSchemaType: (schemaType) => set({ schemaType }),
  handleAddMessage: (message) => {
    const state = get()
    state.addMessage(message)
    const newMessages = [...state.messages, message]
    if (message.role === "user") {
      switch (state.chatType) {
        case "chat":
          sendChat(newMessages, state)
          break
        case "object":
          sendObject(newMessages, state.schemaType, state)
          break
      }
    }
  },
}))
