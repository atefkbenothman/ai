import { PageContent } from "@/components/containers/page-content"
import { Chat } from "@/components/chat/chat"
import { CoreMessage } from "ai"

export default function Syntax() {
  const messages = [
    { role: "system", content: "You are an AI assistant." },
  ] as CoreMessage[]

  return (
    <PageContent>
      <p>Object Chat</p>
    </PageContent>
  )
}
