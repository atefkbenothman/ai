"use client"

import { memo } from "react"
import { ChatPreferencesMenu } from "@/components/chat/chat-preferences-dropdown"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"
import { Plus, Minus } from "lucide-react"
import { useSidePanel } from "@/lib/stores/side-panel-store"

export const ChatHeader = memo(function ChatHeader() {
  const model = useChat(useShallow((state) => state.model))
  const chatMode = useChat(useShallow((state) => state.chatMode))
  const toggleSidePanel = useSidePanel((state) => state.toggle)
  const sidePanelIsOpen = useSidePanel((state) => state.isOpen)

  return (
    <div className="flex items-center justify-between py-1">
      <div className="ml-2 flex-1 items-center justify-start">
        {sidePanelIsOpen ? (
          <Minus
            size={18}
            className="hover:cursor-pointer"
            onClick={toggleSidePanel}
          />
        ) : (
          <Plus
            size={18}
            className="hover:cursor-pointer"
            onClick={toggleSidePanel}
          />
        )}
      </div>
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
