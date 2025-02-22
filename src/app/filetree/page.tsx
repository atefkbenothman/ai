"use client"

import { PageContent } from "@/components/page-content"
import { FileTree } from "@/components/filetree/file-tree"
import { Separator } from "@/components/ui/separator"
import { useFileTree } from "@/lib/stores/file-tree-store"
import { useEffect, useState } from "react"
import { Copy } from "lucide-react"

export default function FileTreePage() {
  const selectedFiles = useFileTree((state) => state.selectedFiles)

  const [finalText, setFinalText] = useState<string>("")

  useEffect(() => {
    const loadFileContents = async () => {
      let combinedText = ""
      for (const file of selectedFiles) {
        try {
          const text = await file[1].text()
          combinedText += `================================================\nFile: ${file[0]}\n================================================\n\n${text}\n\n`
        } catch (error) {
          console.error("Error reading file:", error)
        }
      }
      setFinalText(combinedText)
    }
    loadFileContents()
  }, [selectedFiles])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(finalText)
  }

  return (
    <PageContent>
      <div className="flex items-center justify-between py-1">
        <div className="ml-2 flex-1 items-center" />
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-md font-semibold">File Tree</p>
        </div>
        <div className="mr-2 flex flex-1 items-center justify-end"></div>
      </div>
      <Separator className="h-[0.1rem]" />
      <div className="grid h-full flex-1 grid-cols-1 overflow-auto lg:grid-cols-2">
        <FileTree />
        <div className="m-4 overflow-auto rounded-sm border-[0.1rem] p-2">
          <Copy
            className="right-2 top-2 hover:cursor-pointer hover:text-gray-600"
            onClick={handleCopy}
            size={14}
          />
          <pre className="text-xs">{finalText}</pre>
        </div>
      </div>
    </PageContent>
  )
}
