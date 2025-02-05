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
    <DropdownMenuItem className="flex flex-row justify-between items-center gap-4 hover:bg-accent py-0.5 px-1 rounded-sm">
      <Checkbox
        className="size-3 rounded-2xl border hover:cursor-pointer border-blue-600 data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90 shadow-none"
      />
      <Label>
        {text}
      </Label>
    </DropdownMenuItem>
  )
}

function ChatTypeItem({ chatType }: { chatType: ChatType }) {
  if (chatType.type === "object") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="flex flex-row justify-between items-center gap-4 hover:bg-accent py-0.5 px-1 rounded-sm">
          <ChevronLeft className="size-4 -ml-0.5" />
          <Label>
            {chatType.name}
          </Label>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="p-1 dark rounded-sm border bg-[#121212] text-white border-white/30 text-xs space-y-1">
          {objectSchemas.map((schema) => (
            <ObjectMenuItem key={schema.id} text={schema.name} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }
  return (
    <DropdownMenuItem className="flex flex-row justify-between items-center gap-4 hover:bg-accent py-0.5 px-1 rounded-sm">
      <Checkbox
        className="size-3 border rounded-2xl hover:cursor-pointer border-blue-600 data-[state=checked]:bg-blue-600 dark:data-[state=unchecked]:border-white/90 shadow-none"
      />
      <Label>
        {chatType.name}
      </Label>
    </DropdownMenuItem>
  )
}

type MenuDropdownProps = {
  setChatType: (chatType: ChatCategory) => void
  setSchemaType: (schemaType: ObjectSchemaType) => void
}

export function MenuDropdown({ setChatType, setSchemaType }: MenuDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Menu className="text-white/90 hover:cursor-pointer" size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-1 dark rounded-sm border bg-[#121212] text-white border-white/30 text-xs space-y-1">
        {chatTypes.map((chatType) => (
          <ChatTypeItem key={chatType.id} chatType={chatType} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}