"use server"

import { z } from "zod"
import { AI } from "@atefkbenothman/ai-core"
import { type CoreMessage } from "ai"

const apiKey = process.env.API_KEY ?? ""

// setup api model
const ai = new AI("groq", "deepseek-r1-distill-llama-70b", apiKey)


export type AIResponse = {
  success: boolean
  stream: ReadableStream<any>
  error?: string
}


export async function chat(messages: CoreMessage[]): Promise<AIResponse> {
  const { success, textStream, error } = await ai.streamChat(messages)
  const stream = new ReadableStream({
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
    stream,
    error,
  }
}

const simpleSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
})

export async function getObject(messages: CoreMessage[]): Promise<AIResponse> {
  const { success, partialObjectStream, error } = await ai.streamCreateObject(
    messages,
    simpleSchema,
  )
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        if (success && partialObjectStream) {
          for await (const chunk of partialObjectStream) {
            controller.enqueue(chunk)
            console.dir(chunk, { depth: Infinity})
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
    stream,
    error,
  }
}
