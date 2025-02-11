import { useCallback } from "react"
import { CoreMessageExtras } from "@/lib/ai/chat-modes"
import { objectSchemas } from "@/lib/ai/schemas"
import { LoadingAnimation } from "@/components/chat/loading-animation"
import ReactMarkdown from "react-markdown"
import { Prism } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

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
        <ReactMarkdown className="overflow-x-scroll whitespace-pre-wrap text-sm tracking-wide text-white/90">
          {message.content as string}
        </ReactMarkdown>
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
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => (
                <h1
                  className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-100"
                  {...props}
                />
              ),
              h2: ({ ...props }) => (
                <h2
                  className="mb-3 text-2xl font-semibold text-gray-800 dark:text-gray-100"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-100"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="mb-4 text-gray-600 dark:text-gray-300"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-300"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="mb-4 list-decimal pl-6 text-gray-600 dark:text-gray-300"
                  {...props}
                />
              ),
              li: ({ ...props }) => <li className="mb-2" {...props} />,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              code: ({ className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "")
                const isInline = !className
                return !isInline && match ? (
                  <Prism
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    className="mb-4 rounded-sm"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </Prism>
                ) : (
                  <code
                    className="bg-gray-100 text-sm dark:bg-gray-700"
                    {...props}
                  >
                    {children}
                  </code>
                )
              },
            }}
          >
            {message.content as string}
          </ReactMarkdown>
        ) : message.chatMode === "object" ? (
          <SchemaBlock message={message} schemaType={message.schemaType} />
        ) : null}
      </div>
    </div>
  )
}
