"use client"

import { memo } from "react"
import { MenuDropdown } from "@/components/chat/menu-dropdown"
import { useChatStore } from "@/lib/stores/use-chat-store"
import { useShallow } from "zustand/react/shallow"

export const ChatHeader = memo(function ChatHeader() {
  const model = useChatStore(useShallow((state) => state.model))
  const chatType = useChatStore(useShallow((state) => state.chatType))

  return (
    <div className="flex items-center justify-between py-1">
      <div className="ml-2 flex-1 items-center" />
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-md font-semibold">{model}</p>
        <p className="text-md font-medium text-white/80">[{chatType}]</p>
      </div>
      <div className="mr-2 flex flex-1 items-center justify-end">
        <MenuDropdown />
      </div>
    </div>
  )
})
