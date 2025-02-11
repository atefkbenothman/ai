import { Separator } from "@/components/ui/separator"
import { FileTree } from "@/components/file-tree/file-tree"

export function ChatSidePanel() {
  return (
    <div className="flex h-full w-full flex-col">
      <div>
        <div className="flex items-center justify-between py-1">
          <div className="ml-2 flex-1 items-center" />
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-md font-semibold">File Tree</p>
          </div>
          <div className="mr-2 flex flex-1 items-center justify-end"></div>
        </div>
        <Separator className="h-[0.09rem]" />
      </div>
      <div className="h-full flex-1 overflow-auto">
        <FileTree />
      </div>
    </div>
  )
}
