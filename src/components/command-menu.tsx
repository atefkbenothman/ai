"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCommands } from "@/lib/commands/commands"
import { useCommandMenu } from "@/hooks/use-command-menu"

export const CommandMenu = () => {
  const { commands } = useCommands()
  const {
    open,
    setOpen,
    search,
    setSearch,
    selectedIndex,
    filterCommands,
    handleKeyDown,
  } = useCommandMenu()

  const filteredCommands = filterCommands(commands)

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
      }}
    >
      <DialogTitle />
      <DialogContent className="border-[0.09rem] bg-black p-1 text-sm sm:max-w-[425px]">
        <DialogHeader className="flex w-full flex-row items-center justify-center">
          <div className="flex w-full items-center">
            <Input
              className="flex-1 border-none px-3 outline-none ring-0 focus-visible:ring-0"
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, filteredCommands)}
            />
          </div>
        </DialogHeader>
        <div className="space-y-1 overflow-y-auto">
          {filteredCommands.map((command, index) => (
            <div
              key={command.id}
              className={`m-1 flex cursor-pointer items-center rounded-sm px-2 py-1 ${
                selectedIndex === index ? "bg-sidebar" : "text-muted-foreground"
              }`}
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
