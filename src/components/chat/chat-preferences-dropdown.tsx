import { chatModes, ChatMode } from "@/lib/ai/chat-modes"
import { objectSchemas } from "@/lib/ai/schemas"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"
import { ObjectSchema } from "@/lib/ai/schemas"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"

function ObjectMenuItem({ schema }: { schema: ObjectSchema }) {
  const selectedSchemaType = useChat(useShallow((state) => state.schemaType))
  const selectedChatMode = useChat(useShallow((state) => state.chatMode))
  const setSchemaType = useChat(useShallow((state) => state.setSchemaType))
  const setChatMode = useChat(useShallow((state) => state.setChatMode))

  return (
    <DropdownMenuCheckboxItem
      className="bg-sidebar focus:bg-background"
      onSelect={(e) => e.preventDefault()}
      onClick={() => {
        setSchemaType(schema.type)
        setChatMode("object")
      }}
      checked={
        schema.type === selectedSchemaType && selectedChatMode === "object"
      }
    >
      {schema.name}
    </DropdownMenuCheckboxItem>
  )
}

type ChatModeItemProps = {
  chatMode: ChatMode
}

function ChatModeItem({ chatMode }: ChatModeItemProps) {
  const selectedChatMode = useChat(useShallow((state) => state.chatMode))
  const setChatMode = useChat(useShallow((state) => state.setChatMode))

  if (chatMode.mode === "object") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>{chatMode.name}</DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="bg-sidebar">
          {objectSchemas.map((schema) => (
            <ObjectMenuItem key={schema.id} schema={schema} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }
  return (
    <DropdownMenuCheckboxItem
      className="bg-sidebar focus:bg-background"
      onSelect={(e) => e.preventDefault()}
      onClick={() => setChatMode(chatMode.mode)}
      checked={chatMode.mode === selectedChatMode}
    >
      {chatMode.name}
    </DropdownMenuCheckboxItem>
  )
}

export function ChatPreferencesMenu() {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <EllipsisVertical
          className="text-white/90 hover:cursor-pointer"
          size={18}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-sidebar font-medium">
        {chatModes.map((chatMode) => (
          <ChatModeItem key={chatMode.id} chatMode={chatMode} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
