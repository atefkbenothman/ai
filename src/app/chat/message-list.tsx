import { JSX, memo, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { type CoreMessage } from "ai"
import ReactMarkDown from "react-markdown"

export function Message({
  message,
  isLoading,
}: {
  message: CoreMessage
  isLoading?: boolean
}) {
  if (message.role === "system") {
    return
  }
  return (
    <div
      className={cn(
        "flex",
        message.role === "user"
          ? "justify-end"
          : message.role === "assistant"
            ? "justify-start"
            : "",
      )}
    >
      {isLoading ? (
        <div
          className={cn(
            "max-w-2xl rounded px-2 py-1.5 text-sm font-medium xl:max-w-3xl",
            message.role === "user"
              ? "bg-blue-600 text-white"
              : message.role === "assistant"
                ? "bg-[#151516] text-white"
                : "",
          )}
        >
          <div className="flex items-center space-x-1 rounded-3xl px-1 py-1">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`h-1.5 w-1.5 animate-bounce rounded-full bg-white/30`}
                style={{ animationDelay: `${dot * 0.15}s` }}
              ></div>
            ))}
          </div>
        </div>
      ) : message.content.length > 0 ? (
        <div
          className={cn(
            "max-w-2xl rounded p-2 text-sm font-medium xl:max-w-3xl",
            message.role === "user"
              ? "bg-blue-600 text-white"
              : message.role === "assistant"
                ? "bg-white/5 text-white"
                : "",
          )}
        >
          <ReactMarkDown className="overflow-x-auto whitespace-pre-wrap text-sm tracking-wide">
            {message.content as string}
          </ReactMarkDown>
        </div>
      ) : null}
    </div>
  )
}

export function MessageList({ messages }: { messages: JSX.Element[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const end = endRef.current

    if (container && end) {
      const observer = new MutationObserver(() => {
        end.scrollIntoView({ behavior: "instant", block: "end" })
      })
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      })

      return () => observer.disconnect()
    }
  }, [])

  const GreetingMessage = memo(function GreetingMessage() {
    return <Message message={{ role: "assistant", content: "Hello!" }} />
  })

  return (
    <div
      ref={containerRef}
      className="no-scrollbar flex-1 flex-col-reverse space-y-4 overflow-y-auto p-4"
    >
      <GreetingMessage />
      {messages.map((message, idx) => (
        <div key={idx}>{message}</div>
      ))}
      <div ref={endRef} />
    </div>
  )
}
