"use server"

import { cn } from "@/lib/utils"


function Message({ message }: { message: { id: number, text: string, sender: string } }) {
  return (
    <div className={cn("flex", message.sender === "me" ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-3xl py-1.5 px-2 rounded text-sm font-medium font-[family-name:var(--font-geist-mono)]", message.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-700 text-white")}>
        <p className="tracking-wide">
          {message.text}
        </p>
      </div>
    </div>
  )
}

type MessageListProps = {
  messages: any[]
}

export default async function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(message => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  )
}