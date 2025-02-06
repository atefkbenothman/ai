"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useApiKeyStore } from "@/lib/stores/api-key-store"
import { setApiKey } from "@/server/ai/actions"

export function ApiSettings() {
  const currentApiKey = useApiKeyStore((state) => state.currentApiKey)
  const selectedProvider = useApiKeyStore((state) => state.selectedProvider)
  const updateApiKey = useApiKeyStore((state) => state.updateApiKey)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const apiKey = formData.get("apiKey") as string
    updateApiKey(selectedProvider, apiKey)
    await setApiKey(apiKey)
  }

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <Label htmlFor="apiKey" className="text-sm">
          Groq API Key
        </Label>
        <Input
          id="apiKey"
          name="apiKey"
          type="text"
          placeholder=""
          defaultValue={currentApiKey}
          className="my-1 h-7 px-2"
          required
        />
        <Button type="submit" size="sm" className="mt-4 w-full">
          Save
        </Button>
      </form>
    </div>
  )
}
