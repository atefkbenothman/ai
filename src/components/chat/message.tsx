import { z } from "zod"
import { CoreMessage } from "ai"
import { objectSchemas, ObjectSchemaType } from "@/lib/ai/schemas"
import { Prism } from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import ReactMarkDown from "react-markdown"

function LoadingAnimation() {
  return (
    <div className="flex items-center space-x-1 rounded-3xl px-1 py-1">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className={`h-1.5 w-1.5 animate-bounce rounded-full bg-white/30`}
          style={{ animationDelay: `${dot * 0.15}s` }}
        />
      ))}
    </div>
  )
}

type MessageProps = {
  message: CoreMessage
  isLoading?: boolean
}

export function UserMessage({ message }: MessageProps) {
  if (message.content.length === 0) {
    return null
  }
  return (
    <div className="flex justify-end">
      <div className="max-w-2xl rounded bg-blue-600 p-2 text-sm font-medium xl:max-w-3xl">
        <ReactMarkDown className="overflow-x-scroll whitespace-pre-wrap text-sm tracking-wide">
          {message.content as string}
        </ReactMarkDown>
      </div>
    </div>
  )
}

export function AssistantMessage({ message }: MessageProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-2xl rounded bg-neutral-900 px-2 py-1.5 text-sm font-medium text-white xl:max-w-3xl">
        {message.content.length === 0 ? (
          <LoadingAnimation />
        ) : (
          <ReactMarkDown className="overflow-x-scroll whitespace-pre-wrap text-sm tracking-wide">
            {message.content as string}
          </ReactMarkDown>
        )}
      </div>
    </div>
  )
}

type ObjectMessageProps = {
  message: CoreMessage
  schemaType: ObjectSchemaType
  isLoading?: boolean
}

export function CodeSnippetBlock({ message, schemaType }: ObjectMessageProps) {
  let data

  if (message.content.length > 0) {
    const schema = objectSchemas.find((obj) => obj.type === schemaType)?.schema!
    try {
      const jsonData = JSON.parse(message.content as string)
      const parsedContent = schema.parse(jsonData)
      data = parsedContent as z.infer<typeof schema>
    } catch {
      data = null
    }
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl flex-col rounded bg-neutral-900 px-2 py-1.5 text-sm font-medium text-white xl:max-w-3xl">
        {message.content.length === 0 ? (
          <LoadingAnimation />
        ) : (
          /* eslint-disable @typescript-eslint/no-explicit-any */
          data &&
          data.snippets.map((snippet: any, idx: number) => (
            <Prism
              key={idx}
              language={snippet.language}
              style={gruvboxDark}
              customStyle={{
                borderRadius: "3px",
                fontSize: "0.75rem",
              }}
              wrapLongLines
            >
              {snippet.snippet}
            </Prism>
          ))
        )}
      </div>
    </div>
  )
}
