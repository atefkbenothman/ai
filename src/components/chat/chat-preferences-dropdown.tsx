import { chatTypes, ChatType } from "@/lib/ai/chat-types"
import { objectSchemas } from "@/lib/ai/schemas"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  // DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"
import { useState } from "react"
import { ObjectSchema } from "@/lib/ai/schemas"
import { useChat } from "@/lib/stores/chat-store"
import { useShallow } from "zustand/react/shallow"

function ObjectMenuItem({ schema }: { schema: ObjectSchema }) {
  const selectedSchemaType = useChat(useShallow((state) => state.schemaType))
  const selectedChatType = useChat(useShallow((state) => state.chatType))
  const setSchemaType = useChat(useShallow((state) => state.setSchemaType))
  const setChatType = useChat(useShallow((state) => state.setChatType))

  return (
    <DropdownMenuCheckboxItem
      className=""
      onSelect={(e) => e.preventDefault()}
      onClick={() => {
        setSchemaType(schema.type)
        setChatType("object")
      }}
      checked={
        schema.type === selectedSchemaType && selectedChatType === "object"
      }
    >
      {schema.name}
    </DropdownMenuCheckboxItem>
  )
}

type ChatTypeItemProps = {
  chatType: ChatType
}

function ChatTypeItem({ chatType }: ChatTypeItemProps) {
  const selectedChatType = useChat(useShallow((state) => state.chatType))
  const setChatType = useChat(useShallow((state) => state.setChatType))

  if (chatType.type === "object") {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="">
          {chatType.name}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="">
          {objectSchemas.map((schema) => (
            <ObjectMenuItem key={schema.id} schema={schema} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }
  return (
    <DropdownMenuCheckboxItem
      className=""
      onSelect={(e) => e.preventDefault()}
      onClick={() => setChatType(chatType.type)}
      checked={chatType.type === selectedChatType}
    >
      {chatType.name}
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
      <DropdownMenuContent align="end" className="">
        {chatTypes.map((chatType) => (
          <ChatTypeItem key={chatType.id} chatType={chatType} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
