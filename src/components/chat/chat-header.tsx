"use client"

import { MenuDropdown } from "@/components/chat/menu-dropdown"
import { useChat } from "@/hooks/use-chat"

export function ChatHeader() {
  const { model, chatType } = useChat()

  return (
    <div className="flex items-center justify-between py-1">
      <div className="ml-2 flex-1 items-center" />
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-md font-semibold">{model}</p>
        <p className="text-xs font-medium text-white/80">[{chatType}]</p>
      </div>
      <div className="mr-2 flex flex-1 items-center justify-end">
        <MenuDropdown />
      </div>
    </div>
  )
}
