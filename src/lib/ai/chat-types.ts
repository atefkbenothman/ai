import { type CoreMessage } from "ai"
import { ObjectSchemaType } from "./schemas"

export type ChatCategory = "chat" | "object"

export type CoreMessageExtras = CoreMessage & {
  chatType: ChatCategory
  schemaType: ObjectSchemaType
}

export type ChatType = {
  id: string
  name: string
  type: ChatCategory
  description: string
}

export const chatTypes: Array<ChatType> = [
  {
    id: "chat",
    name: "normal",
    type: "chat",
    description: "normal chat",
  },
  {
    id: "object",
    name: "schemas",
    type: "object",
    description: "generate strutured object",
  },
] as const
