"use server"

import { AI } from "@atefkbenothman/ai-core"
import { type CoreMessage } from "ai"
import { objectSchemas, ObjectSchemaType } from "@/lib/ai/schemas"
import { cookies } from "next/headers"

export type AIResponse = {
  success: boolean
  stream: ReadableStream
  error?: string
}

export async function setApiKey(apiKey: string) {
  const cookieStore = await cookies()
  cookieStore.set("api-key", apiKey, { httpOnly: true })
}

async function getApiKey() {
  const cookieStore = await cookies()
  const key = cookieStore.get("api-key")?.value
  return key ?? ""
}

export async function chat(messages: CoreMessage[]): Promise<AIResponse> {
  const apiKey = await getApiKey()
  const ai = new AI("groq", "deepseek-r1-distill-llama-70b", apiKey)
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

export async function getObject(
  messages: CoreMessage[],
  schemaType: ObjectSchemaType,
): Promise<AIResponse> {
  const apiKey = await getApiKey()
  const ai = new AI("groq", "deepseek-r1-distill-llama-70b", apiKey)
  const schema = objectSchemas.find((obj) => obj.type === schemaType)!.schema
  const { success, partialObjectStream, error } = await ai.streamCreateObject(
    messages,
    schema,
  )
  const stream = new ReadableStream({
    async pull(controller) {
      try {
        if (success && partialObjectStream) {
          for await (const chunk of partialObjectStream) {
            controller.enqueue(JSON.stringify(chunk))
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
