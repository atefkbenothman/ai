"use server"

import { AI } from "@atefkbenothman/ai-core"
import { type CoreMessage } from "ai"

const ai = new AI(
  "groq",
  "deepseek-r1-distill-llama-70b",
  "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",
)

export async function streamChat(messages: CoreMessage[]) {
  const { success, textStream, error } = await ai.streamChat(messages)
  const readableStream = new ReadableStream({
    async pull(controller) {
      try {
        if (success && textStream) {
          for await (const chunk of textStream) {
            controller.enqueue(chunk)
          }
        }
      } catch (error) {
        controller.error(error)
      } finally {
        controller.close()
      }
    },
  })
  return {
    success,
    readableStream,
    error,
  }
}
