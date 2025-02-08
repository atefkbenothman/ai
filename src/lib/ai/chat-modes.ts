import { type CoreMessage } from "ai"
import { ObjectSchemaType } from "./schemas"

export type ChatModes = "chat" | "object"

export type CoreMessageExtras = CoreMessage & {
  chatMode: ChatModes
  schemaType: ObjectSchemaType
}

export type ChatMode = {
  id: string
  name: string
  mode: ChatModes
  description: string
}

export const chatModes: ChatMode[] = [
  {
    id: "chat",
    name: "normal",
    mode: "chat",
    description: "normal chat",
  },
  {
    id: "object",
    name: "schemas",
    mode: "object",
    description: "generate strutured object",
  },
] as const
