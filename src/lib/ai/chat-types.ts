export type ChatCategory  = "chat" | "object"

export type ChatType = {
  id: string
  name: string
  type: ChatCategory
  description: string
}

export const chatTypes: Array<ChatType> = [
  {
    id: "chat",
    name: "chat",
    type: "chat",
    description: "normal chat"
  },
  {
    id: "object",
    name: "object",
    type: "object",
    description: "generate strutured object"
  }
]

export const DEFAULT_CHAT_TYPE: ChatCategory = "chat"