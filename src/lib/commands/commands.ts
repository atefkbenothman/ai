import { Link, LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

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

  const commands: CommandItem[] = [
    {
      id: "home",
      name: "Home",
      description: "navigate to the home page",
      icon: Link,
      category: "navigation",
      keywords: ["home"],
      action: () => router.push("/"),
    },
    {
      id: "chat",
      name: "Chat",
      description: "navigate to the chat page",
      icon: Link,
      category: "navigation",
      keywords: ["chat"],
      action: () => router.push("/chat"),
    },
    {
      id: "settings",
      name: "Settings",
      description: "navigate to the settings page",
      icon: Link,
      category: "navigation",
      keywords: ["settings"],
      action: () => router.push("/settings"),
    },
  ]

  return { commands }
}
