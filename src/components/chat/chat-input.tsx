"use client"

import { useState } from "react"
import { CoreMessage } from "ai"
import { AutoResizeTextArea } from "@/components/chat/autoresize-textarea"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"

export function ChatInput() {
  const handleAddMessage = useChat(
    useShallow((state) => state.handleAddMessage),
  )

  const [message, setMessage] = useState<string>("")

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim().length === 0) {
      setMessage("")
      return
    }
    const coreMessage = { role: "user", content: message } as CoreMessage
    handleAddMessage(coreMessage)
    setMessage("")
  }

  const handleToggleMic = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("Mic toggled")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto my-4 flex w-3/4 items-center justify-center rounded-sm border bg-sidebar px-1 py-1 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/10 focus-within:ring-offset-0"
    >
      <AutoResizeTextArea
        id="message"
        name="message"
        placeholder="Enter a message"
        className="flex-1 rounded-sm bg-sidebar px-[0.25rem] py-[0.25rem] placeholder:text-white/50 focus:outline-none focus:ring-0"
        value={message}
        onChange={setMessage}
        onKeyDown={handleKeyDown}
      />

      <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-1.5 right-1 size-6 rounded-sm"
        onClick={handleToggleMic}
      >
        <Mic size={16} />
      </Button>
    </form>
  )
}
