import { create } from "zustand"
import { ProviderConfig, ProviderName, providers } from "@/lib/ai/providers"

type ApiKeyState = {
  apiKey: string
  providers: Record<string, ProviderConfig>
  selectedProvider: ProviderName
  updateProviderApiKey: (provider: string, key: string) => void
  setSelectedProvider: (provider: string) => void
}

export const useApiKeyStore = create<ApiKeyState>((set) => ({
  providers,
  selectedProvider: "Groq",
  apiKey: providers["Groq"].apiKey,
  updateProviderApiKey: (provider, key) =>
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          apiKey: key,
        },
      },
      apiKey: key,
    })),
  setSelectedProvider: (selectedProvider) =>
    set((state) => ({
      selectedProvider: selectedProvider,
      apiKey: state.providers[selectedProvider].apiKey,
    })),
}))
