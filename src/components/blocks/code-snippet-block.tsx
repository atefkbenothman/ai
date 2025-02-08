import { z } from "zod"
import { LoadingAnimation } from "@/components/chat/loading-animation"
import { objectSchemas, ObjectSchemaType } from "@/lib/ai/schemas"
import { Prism } from "react-syntax-highlighter"
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { CoreMessageExtras } from "@/lib/ai/chat-types"

type ObjectMessageProps = {
  message: CoreMessageExtras
  schemaType: ObjectSchemaType
  isLoading?: boolean
}

export function CodeSnippetBlock({ message, schemaType }: ObjectMessageProps) {
  let data

  if (message.content.length > 0) {
    try {
      const schema = objectSchemas.find(
        (obj) => obj.type === schemaType,
      )!.schema
      const jsonData = JSON.parse(message.content as string)
      const parsedContent = schema.parse(jsonData)
      data = parsedContent as z.infer<typeof schema>
    } catch {
      data = null
    }
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-2xl flex-col rounded-sm px-2 py-1.5 text-sm font-medium text-white xl:max-w-3xl">
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
