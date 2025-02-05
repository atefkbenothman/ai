"use server"

import { PageContent } from "@/components/containers/page-content"
import { Chat } from "@/components/chat/chat"

export default async function ChatPage() {
  return (
    <PageContent>
      <Chat />
    </PageContent>
  )
}
