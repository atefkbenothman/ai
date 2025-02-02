"use server"

import Content from "@/components/containers/content"
import ChatContainer from "./chat-container"

export default async function Chat() {
  return (
    <Content>
      <ChatContainer />
    </Content>
  )
}
