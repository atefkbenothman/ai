"use client"

import { useActionState, useState } from "react"
import { askChat } from "@/actions/chat"
import AutoResizeTextArea from "@/components/autoresize-textarea"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from "lucide-react"

const initialState = {
  message: ""
}

export default function ChatForm() {
  const [state, formAction, pending] = useActionState(askChat, initialState)

  return (
    <form action={formAction} className="w-3/4 mx-auto bg-neutral-900 focus-within:ring-ring/10 relative my-4 flex items-center rounded-md border px-2 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0">
      <AutoResizeTextArea
        id="message"
        name="message"
        placeholder="Enter a message"
        className="placeholder:text-gray-500 flex-1 focus:outline-none px-[0.5rem] py-[0.25rem] bg-neutral-900 rounded-md focus:ring-0 font-[family-name:var(--font-geist-mono)]"
      />
      <Button variant="ghost" size="sm" className="absolute bottom-2 right-1 size-6 rounded-md" type="submit">
        <ArrowUpIcon size={16} />
      </Button>
    </form>
  )
}