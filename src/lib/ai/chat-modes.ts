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
    name: "Normal",
    mode: "chat",
    description: "Normal chat",
  },
  {
    id: "object",
    name: "Schemas",
    mode: "object",
    description: "Generate strutured object",
  },
] as const
