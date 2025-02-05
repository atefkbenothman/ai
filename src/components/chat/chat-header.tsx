"use client"

import { MenuDropdown } from "@/components/chat/menu-dropdown"
import { ObjectSchemaType } from "@/lib/ai/schemas"
import { ChatCategory } from "@/lib/ai/chat-types"


type ChatHeaderProps = {
  model: string
  setChatType: (chatType: ChatCategory) => void
  setSchemaType: (schemaType: ObjectSchemaType) => void
}

export function ChatHeader({ model, setChatType, setSchemaType }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex-1" />
      <p className="text-md font-semibold">{model}</p>
      <div className="mr-2 flex flex-1 justify-end">
        <MenuDropdown setChatType={setChatType} setSchemaType={setSchemaType} />
      </div>
    </div>
  )
}
