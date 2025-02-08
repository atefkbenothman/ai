import { Link, LucideIcon, CodeXml } from "lucide-react"
import { useRouter } from "next/navigation"
import { useChat } from "@/lib/stores/chat-store"
import { chatModes } from "@/lib/ai/chat-modes"

export type CommandItem = {
  id: string
  name: string
  description: string
  icon?: LucideIcon
  shortcut?: string
  category?: string
  action: () => void
  keywords?: string[]
}

export const useCommands = () => {
  const router = useRouter()

  const { setChatMode } = useChat()

  const commands: CommandItem[] = [
    {
      id: "home",
      name: "Home",
      description: "Navigate to the home page",
      icon: Link,
      category: "navigation",
      keywords: ["home"],
      action: () => router.push("/"),
    },
    {
      id: "chat",
      name: "Chat",
      description: "Navigate to the chat page",
      icon: Link,
      category: "navigation",
      keywords: ["chat"],
      action: () => router.push("/chat"),
    },
    {
      id: "settings",
      name: "Settings",
      description: "Navigate to the settings page",
      icon: Link,
      category: "navigation",
      keywords: ["settings"],
      action: () => router.push("/settings"),
    },
    ...chatModes.map((mode) => ({
      id: `mode-${mode.id}`,
      name: mode.name,
      description: "Change the chat mode",
      icon: CodeXml,
      category: "chat-mode",
      keywords: ["mode", "/mode", mode.name, mode.description],
      action: () => setChatMode(mode.mode),
    })),
  ]

  return { commands }
}
