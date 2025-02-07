"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useCommands } from "@/lib/commands/commands"

export const CommandMenu = () => {
  const { commands } = useCommands()

  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Filter commands from input
  const filteredCommands = commands.filter(
    (command) =>
      command.name.toLowerCase().includes(search.toLowerCase()) ||
      command.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(search.toLowerCase()),
      ),
  )

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault()
        break
      case "j":
        if (e.ctrlKey) {
          e.preventDefault()
          setSelectedIndex((i) =>
            i + 1 >= filteredCommands.length ? 0 : i + 1,
          )
        }
        break
      case "k":
        if (e.ctrlKey) {
          e.preventDefault()
          e.stopPropagation()
          setSelectedIndex((i) =>
            i - 1 < 0 ? filteredCommands.length - 1 : i - 1,
          )
        }
        break
      case "Enter":
        e.preventDefault()
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action()
          setOpen(false)
        }
        break
    }
  }

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearch("")
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
      }}
    >
      <DialogTitle />
      <DialogContent className="bg-black p-1 text-sm sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-row items-center justify-center">
          <div className="flex w-full items-center space-x-0 px-2">
            <Search className="h-5 w-5 text-center text-muted-foreground" />
            <Input
              className="flex-1 border-none px-3 outline-none ring-0 focus-visible:ring-0"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </DialogHeader>
        <div className="space-y-1 overflow-y-auto">
          {filteredCommands.map((command, index) => (
            <div
              key={command.id}
              className={`m-1 flex cursor-pointer items-center rounded-sm px-2 py-1 ${selectedIndex === index ? "bg-sidebar" : "text-muted-foreground"}`}
              onClick={() => {
                command.action()
                setOpen(false)
              }}
            >
              {command.icon && <command.icon className="h-4 w-4" />}
              <div className="ml-4">
                <div className="font-medium">{command.name}</div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
