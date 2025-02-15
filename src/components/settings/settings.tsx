"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSettings } from "@/lib/stores/settings-store"
import { setApiKey } from "@/server/ai/actions"
import { useShallow } from "zustand/react/shallow"
import { toast } from "sonner"
import { Pencil, Trash2, Check } from "lucide-react"
import { useState } from "react"

export function Settings() {
  const currentApiKey = useSettings(useShallow((state) => state.currentApiKey))
  const selectedProvider = useSettings(
    useShallow((state) => state.selectedProvider),
  )
  const updateApiKey = useSettings(useShallow((state) => state.updateApiKey))

  const [isEditing, setIsEditing] = useState(false)
  const [apiKeyValue, setApiKeyValue] = useState<string>(currentApiKey)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleDelete = () => {
    setIsEditing(false)
    setApiKeyValue("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateApiKey(selectedProvider, apiKeyValue)
    await setApiKey(apiKeyValue)
    toast.success("Saved API key")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-[90%] flex-col gap-2 rounded-sm border border-[0.1rem] p-4 md:w-[75%] lg:w-[50%] xl:w-[40%]"
    >
      <Label htmlFor="apiKey" className="text-md font-semibold">
        Groq API Key
      </Label>
      <div className="flex flex-row gap-2">
        <Input
          id="apiKey"
          name="apiKey"
          type="text"
          value={apiKeyValue}
          onChange={(e) => setApiKeyValue(e.target.value)}
          className="w-full border-[0.1rem] text-white/80"
          disabled={!isEditing}
          required
        />
        {isEditing ? (
          <Button
            variant="outline"
            size="icon"
            className="border-[0.1rem]"
            onClick={() => setIsEditing(false)}
            type="button"
          >
            <Check className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="border-[0.1rem]"
            onClick={handleEdit}
            type="button"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="border-[0.1rem]"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
      <div className="mt-8">
        <Button className="w-fit" size="sm" type="submit" variant="outline">
          Save
        </Button>
      </div>
    </form>
  )
}
