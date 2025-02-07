import { chatTypes, ChatType } from "@/lib/ai/chat-types"
import { objectSchemas } from "@/lib/ai/schemas"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Menu, ChevronLeft } from "lucide-react"
import { useState } from "react"
import { ObjectSchema } from "@/lib/ai/schemas"
import { useChatStore } from "@/lib/stores/use-chat-store"
import { useShallow } from "zustand/react/shallow"

function ObjectMenuItem({ schema }: { schema: ObjectSchema }) {
  const schemaType = useChatStore(useShallow((state) => state.schemaType))
  const chatType = useChatStore(useShallow((state) => state.chatType))
  const setSchemaType = useChatStore(useShallow((state) => state.setSchemaType))
  const setChatType = useChatStore(useShallow((state) => state.setChatType))

  return (
    <DropdownMenuItem
      className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent"
      onSelect={(e) => e.preventDefault()}
      onClick={() => {
        setSchemaType(schema.type)
        setChatType("object")
      }}
    >
      <Checkbox
        className="size-3 rounded-2xl border shadow-none hover:cursor-pointer data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90"
        checked={schema.type === schemaType && chatType === "object"}
      />
      <Label>{schema.name}</Label>
    </DropdownMenuItem>
  )
}

type ChatTypeItemProps = {
  chatType: ChatType
}

function ChatTypeItem({ chatType }: ChatTypeItemProps) {
  const selectedChatType = useChatStore(useShallow((state) => state.chatType))
  const setChatType = useChatStore(useShallow((state) => state.setChatType))

  if (chatType.type === "object") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent">
          <ChevronLeft className="-ml-0.5 size-4" />
          <Label>{chatType.name}</Label>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="dark space-y-1 rounded-sm border border-white/30 bg-[#121212] p-1 text-xs text-white">
          {objectSchemas.map((schema) => (
            <ObjectMenuItem key={schema.id} schema={schema} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }
  return (
    <DropdownMenuItem
      className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent"
      onSelect={(e) => e.preventDefault()}
      onClick={() => setChatType(chatType.type)}
    >
      <Checkbox
        className="size-3 rounded-2xl border shadow-none hover:cursor-pointer data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90"
        checked={selectedChatType === chatType.type}
      />
      <Label>{chatType.name}</Label>
    </DropdownMenuItem>
  )
}

export function MenuDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Menu className="text-white/90 hover:cursor-pointer" size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark space-y-1 rounded-sm border border-white/30 bg-[#121212] p-1 text-xs text-white"
      >
        {chatTypes.map((chatType) => (
          <ChatTypeItem key={chatType.id} chatType={chatType} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
