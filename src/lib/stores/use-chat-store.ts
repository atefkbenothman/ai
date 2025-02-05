import { create } from "zustand"
import { type CoreMessage } from "ai"
import { ChatCategory } from "../ai/chat-types"
import { ObjectSchemaType } from "../ai/schemas"

type ChatState = {
  model: string
  messages: CoreMessage[]
  chatType: ChatCategory
  schemaType: ObjectSchemaType
  isProcessing: boolean
  setMessages: (messages: CoreMessage[]) => void
  addMessage: (message: CoreMessage) => void
  updateLastMessage: (content: string) => void
  setChatType: (type: ChatCategory) => void
  setSchemaType: (type: ObjectSchemaType) => void
  setIsProcessing: (isProcessing: boolean) => void
}

const initialState = {
  model: "groq",
  messages: [],
  chatType: "chat" as ChatCategory,
  schemaType: "snippets" as ObjectSchemaType,
  isProcessing: false,
}

export const useChatStore = create<ChatState>((set) => ({
  ...initialState,
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  updateLastMessage: (content) =>
    set((state) => ({
      messages: [
        ...state.messages.slice(0, -1),
        {
          role: "assistant",
          content: content,
        },
      ],
    })),
  setChatType: (chatType) => set({ chatType }),
  setSchemaType: (schemaType) => set({ schemaType }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
}))
