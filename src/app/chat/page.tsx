"use server"

import { PageContent } from "@/components/containers/page-content"
import { CoreMessage } from "ai"
import { Chat } from "@/components/chat/chat"
// import { DEFAULT_CHAT_TYPE } from "@/lib/ai/chat-types"
// import { DEFAULT_CHAT_SCHEMA } from "@/lib/ai/schemas"

export default async function ChatPage() {
  // retrieve messages from some kind of db
  const messages = [
    { role: "system", content: "You are an AI assistant." },
  ] as CoreMessage[]

  return (
    <PageContent>
      <Chat
        model="groq"
        initialMessages={messages}
        initialChatType={"object"}
        initialSchemaType={"snippets"}
      />
    </PageContent>
  )
}
