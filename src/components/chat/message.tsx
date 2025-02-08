import { useCallback } from "react"
import { CoreMessageExtras } from "@/lib/ai/chat-modes"
import { objectSchemas } from "@/lib/ai/schemas"
import { LoadingAnimation } from "@/components/chat/loading-animation"
import ReactMarkDown from "react-markdown"

type MessageProps = {
  message: CoreMessageExtras
  isLoading?: boolean
}

export function UserMessage({ message }: MessageProps) {
  if (message.content.length === 0) {
    return null
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-2xl rounded-sm bg-blue-600 p-2 text-sm font-medium xl:max-w-3xl">
        <ReactMarkDown className="overflow-x-scroll whitespace-pre-wrap text-sm tracking-wide text-white/90">
          {message.content as string}
        </ReactMarkDown>
      </div>
    </div>
  )
}

export function AssistantMessage({ message }: MessageProps) {
  const objectSchema = useCallback(() => {
    return objectSchemas.find((schema) => schema.type === message.schemaType)!
      .component
  }, [message.schemaType])

  const SchemaBlock = objectSchema()

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl rounded-sm px-2 py-1.5 text-sm font-medium text-white/90 xl:max-w-3xl">
        {message.content.length === 0 ? (
          <LoadingAnimation />
        ) : message.chatMode === "chat" ? (
          <ReactMarkDown className="overflow-x-scroll whitespace-pre-wrap text-sm tracking-wide">
            {message.content as string}
          </ReactMarkDown>
        ) : message.chatMode === "object" ? (
          <SchemaBlock message={message} schemaType={message.schemaType} />
        ) : null}
      </div>
    </div>
  )
}
