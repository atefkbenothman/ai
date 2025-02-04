"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu"
import { Menu } from "lucide-react"

type ChatHeaderProps = {
  model: string
}

export function ChatHeader({ model }: ChatHeaderProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)

  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt)
    console.log(selectedPrompt)
  }

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex-1" />
      <p className="text-md font-semibold">{model}</p>
      <div className="mx-4 flex flex-1 justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hover:cursor-pointer">
            <Menu size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="my-1 rounded-sm border-black bg-white p-1 text-sm text-black"
          >
            <DropdownMenuSeparator className="bg-white" />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0">
                prompts
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="rounded border-black bg-white p-1 text-xs font-semibold text-black">
                  <DropdownMenuSubContent className="rounded border-black bg-white p-1 text-xs font-semibold text-black">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0">
                        code
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="rounded border-black bg-white p-1 text-xs font-semibold text-black">
                          <DropdownMenuItem
                            className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                            onClick={() => handlePromptSelect("snippet")}
                          >
                            snippet
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                            onClick={() => handlePromptSelect("pullRequest")}
                          >
                            pull request
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem
                      className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                      onClick={() => handlePromptSelect("summary")}
                    >
                      summary
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                  <DropdownMenuItem
                    className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                    onClick={() => handlePromptSelect("summary")}
                  >
                    summary
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                    onClick={() => handlePromptSelect("revise")}
                  >
                    revise
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="rounded p-1 text-xs font-semibold hover:bg-gray-100 focus:bg-gray-300 focus:outline-none focus:ring-0"
                    onClick={() => handlePromptSelect("refactor")}
                  >
                    refactor
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
