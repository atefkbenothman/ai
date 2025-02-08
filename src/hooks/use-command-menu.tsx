import { useEffect } from "react"
import { CommandItem } from "@/lib/commands/commands"
import { useCommandStore } from "@/lib/stores/command-menu-store"

export const useCommandMenu = () => {
  const {
    open,
    search,
    selectedIndex,
    setOpen,
    setSearch,
    setSelectedIndex,
    toggleMenu,
    reset,
  } = useCommandStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        reset()
        toggleMenu()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleMenu, reset])

  const filterCommands = (commands: CommandItem[]) => {
    if (search.startsWith("/mode") || search.startsWith("mode")) {
      const searchTerm = search
        .replace(/^\/?mode/, "")
        .trim()
        .toLowerCase()
      return commands.filter(
        (command) =>
          command.category === "chat-mode" &&
          (command.name.toLowerCase().includes(searchTerm) ||
            command.description.toLowerCase().includes(searchTerm) ||
            command.keywords?.some((keyword) =>
              keyword.toLowerCase().includes(searchTerm),
            )),
      )
    }
    return commands.filter(
      (command) =>
        command.name.toLowerCase().includes(search.toLowerCase()) ||
        command.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase()),
        ),
    )
  }

  const handleKeyDown = (
    e: React.KeyboardEvent,
    filteredCommands: CommandItem[],
  ) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault()
        break
      case "j":
        if (e.ctrlKey) {
          e.preventDefault()
          setSelectedIndex(
            selectedIndex + 1 >= filteredCommands.length
              ? 0
              : selectedIndex + 1,
          )
        }
        break
      case "k":
        if (e.ctrlKey) {
          e.preventDefault()
          e.stopPropagation()
          setSelectedIndex(
            selectedIndex - 1 < 0
              ? filteredCommands.length - 1
              : selectedIndex - 1,
          )
        }
        break
      case "Enter":
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          setOpen(false)
          reset()
        }
        break
    }
  }

  return {
    open,
    setOpen,
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filterCommands,
    handleKeyDown,
  }
}
