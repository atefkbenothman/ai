"use client"

import { useState } from "react"
import { type CoreMessage } from "ai"
import { AutoResizeTextArea } from "@/components/autoresize-textarea"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

type ChatFormProps = {
  addMessage: (message: CoreMessage) => void
}

export function ChatForm({ addMessage }: ChatFormProps) {
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
    const newMessage = { role: "user", content: message } as CoreMessage
    addMessage(newMessage)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto my-4 flex w-3/4 items-center rounded-md border bg-sidebar px-2 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/10 focus-within:ring-offset-0"
    >
      <AutoResizeTextArea
        id="message"
        name="message"
        placeholder="Enter a message"
        className="flex-1 rounded-md bg-sidebar px-[0.5rem] py-[0.25rem] placeholder:text-white/50 focus:outline-none focus:ring-0"
        value={message}
        onChange={setMessage}
        onKeyDown={handleKeyDown}
      />

      <Button
        variant="ghost"
        size="sm"
        className="absolute bottom-2 right-1 size-6 rounded-md"
        type="submit"
      >
        <ArrowUpIcon size={16} />
      </Button>
    </form>
  )
}
