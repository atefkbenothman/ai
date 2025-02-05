import { type ChatCategory, chatTypes, ChatType } from "@/lib/ai/chat-types"
import { objectSchemas, ObjectSchemaType } from "@/lib/ai/schemas"
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

function ObjectMenuItem({ text }: { text: string }) {
  return (
    <DropdownMenuItem className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent">
      <Checkbox className="size-3 rounded-2xl border border-blue-600 shadow-none hover:cursor-pointer data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90" />
      <Label>{text}</Label>
    </DropdownMenuItem>
  )
}

function ChatTypeItem({ chatType }: { chatType: ChatType }) {
  if (chatType.type === "object") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent">
          <ChevronLeft className="-ml-0.5 size-4" />
          <Label>{chatType.name}</Label>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="dark space-y-1 rounded-sm border border-white/30 bg-[#121212] p-1 text-xs text-white">
          {objectSchemas.map((schema) => (
            <ObjectMenuItem key={schema.id} text={schema.name} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }
  return (
    <DropdownMenuItem className="flex flex-row items-center justify-between gap-4 rounded-sm px-1 py-0.5 hover:bg-accent">
      <Checkbox className="size-3 rounded-2xl border border-blue-600 shadow-none hover:cursor-pointer data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90" />
      <Label>{chatType.name}</Label>
    </DropdownMenuItem>
  )
}

type MenuDropdownProps = {
  setChatType?: (chatType: ChatCategory) => void
  setSchemaType?: (schemaType: ObjectSchemaType) => void
}

export function MenuDropdown({}: MenuDropdownProps) {
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
