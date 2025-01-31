"use server"

import { z } from "zod"
// import { streamChat } from "ai-core"

const chatSchema = z.object({
  message: z.string().min(1, "Message is required")
})

export type AskChatResponse = {
  success: boolean
  message: string
}

export async function askChat(prevState: any, formData: FormData): Promise<{ message: string }> {
  const rawData = {
    message: formData.get("message") as string
  }
  // validatae form data
  const validatedData = chatSchema.safeParse(rawData)
  if (!validatedData.success) {
    return { message: "failed" }
  }
  const message = validatedData.data.message
  console.log("message:", message)
  // const messages = [
  //   { role: "system", content: "you are a python expert" },
  //   { role: "user", content: "write a simple hello world function" }
  // ]
  // const data = await streamChat(messages)
  // console.log(data)
  return { message: "success" }
}