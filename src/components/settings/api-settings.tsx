"use client"

import { useApiKeyStore } from "@/lib/stores/api-key-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function ApiSettings() {
  const { apiKey, selectedProvider, updateProviderApiKey } = useApiKeyStore()

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="apiKey" className="text-sm">
        Groq API Key
      </Label>
      <Input
        id="apiKey"
        type="text"
        placeholder=""
        defaultValue={apiKey}
        className="m-0 h-7 px-2"
        required
        onChange={(e) => updateProviderApiKey(selectedProvider, e.target.value)}
      />
    </div>
  )
}
