import { create } from "zustand"
import { ProviderConfig, ProviderName, providers } from "@/lib/ai/providers"

type ApiKeyState = {
  providers: Record<ProviderName, ProviderConfig>
  selectedProvider: ProviderName
  currentApiKey: string
  updateApiKey: (provider: ProviderName, key: string) => void
  setSelectedProvider: (provider: ProviderName) => void
}

export const useSettings = create<ApiKeyState>((set) => ({
  providers: providers,
  selectedProvider: "Groq",
  currentApiKey: providers["Groq"].apiKey,
  updateApiKey: (provider, key) => {
    set((state) => ({
      providers: {
        ...state.providers,
        [provider]: {
          ...state.providers[provider],
          apiKey: key,
        },
      },
      // Update currentApiKey if this is the selected provider
      currentApiKey:
        provider === state.selectedProvider ? key : state.currentApiKey,
    }))
  },
  setSelectedProvider: (provider) =>
    set((state) => ({
      selectedProvider: provider,
      currentApiKey: state.providers[provider].apiKey,
    })),
}))
