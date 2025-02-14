"use client"

import { useState } from "react"
import { type CoreMessage } from "ai"
import { Mic } from "@/components/mic"
import { AutoResizeTextArea } from "@/components/chat/autoresize-textarea"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"
import { useFileTree } from "@/lib/stores/file-tree-store"

export function ChatInput() {
  const handleAddMessage = useChat(
    useShallow((state) => state.handleAddMessage),
  )
  const selectedFiles = useFileTree((state) => state.selectedFiles)

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
    let content = message
    // Add selected file contents to the message
    if (selectedFiles.size > 0) {
      const fileContents = await Promise.all(
        Array.from(selectedFiles.entries()).map(async ([path, file]) => {
          const text = await file.text()
          return `File: ${path}\n\`\`\`\n${text}\n\`\`\`\n`
        }),
      )
      content += "\n\n" + fileContents.join("\n")
    }
    const coreMessage = { role: "user", content } as CoreMessage
    handleAddMessage(coreMessage)
    setMessage("")
  }

  const handleMicOutput = (text: string) => {
    setMessage(text)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto my-4 flex w-3/4 items-center justify-center rounded-sm border-[0.01rem] bg-sidebar px-1 py-1 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-ring/10 focus-within:ring-offset-0"
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
      <Mic onTextOutput={handleMicOutput} />
    </form>
  )
}
