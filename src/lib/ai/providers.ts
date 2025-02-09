export type ProviderConfig = {
  apiKey: string
}

export const providers: Record<string, ProviderConfig> = {
  Groq: {
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY ?? "",
  },
  OpenAI: {
    apiKey: "openai api key",
  },
  Github: {
    apiKey: "",
  },
} as const

export type ProviderName = keyof typeof providers
