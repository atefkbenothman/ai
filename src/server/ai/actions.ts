"use server"

import { AI } from "@atefkbenothman/ai-core"
import { type CoreMessage } from "ai"

const apiKey = process.env.API_KEY ?? ""

const ai = new AI("groq", "deepseek-r1-distill-llama-70b", apiKey)

export async function chat(messages: CoreMessage[]) {
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
