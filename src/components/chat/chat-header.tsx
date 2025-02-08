"use client"

import { memo } from "react"
import { ChatPreferencesMenu } from "@/components/chat/chat-preferences-dropdown"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"

export const ChatHeader = memo(function ChatHeader() {
  const model = useChat(useShallow((state) => state.model))
  const chatMode = useChat(useShallow((state) => state.chatMode))

  return (
    <div className="flex items-center justify-between py-1">
      <div className="ml-2 flex-1 items-center" />
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-md font-semibold">{model}</p>
        <p className="text-md font-medium text-white/80">[{chatMode}]</p>
      </div>
      <div className="mr-2 flex flex-1 items-center justify-end">
        <ChatPreferencesMenu />
      </div>
    </div>
  )
})
