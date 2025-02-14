import { Button } from "@/components/ui/button"
import { Folder } from "lucide-react"
import { type TreeItemType } from "@/components/file-tree/tree-item"

function formatDirectoryStructure(fileList: FileList): TreeItemType[] {
  const tree: TreeItemType[] = []
  const pathMap = new Map<string, TreeItemType>()

  Array.from(fileList).forEach((file) => {
    const parts = file.webkitRelativePath.split("/")
    let currentPath = ""
    let currentLevel = tree

    parts.forEach((part, index) => {
      currentPath += (currentPath ? "/" : "") + part
      const isLast = index === parts.length - 1

      if (!pathMap.has(currentPath)) {
        const newItem: TreeItemType = [part, [], isLast ? file : undefined]

        pathMap.set(currentPath, newItem)
        currentLevel.push(newItem)
      }

      if (!isLast) {
        currentLevel = pathMap.get(currentPath)![1]
      }
    })
  })

  return tree
}

type FileInputProps = {
  setTreeData: (item: TreeItemType[]) => void
}

export function FileInput({ setTreeData }: FileInputProps) {
  const handleDirectorySelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files
    if (files) {
      const formattedTree = formatDirectoryStructure(files)
      setTreeData(formattedTree)
    }
  }

  return (
    <Button
      variant="outline"
      className="rounded-sm border-[0.1rem] hover:cursor-default"
    >
      <div className="flex w-full flex-row items-center justify-center gap-2">
        <Folder className="scale-90" />
        <p>Open</p>
        <input
          type="file"
          webkitdirectory=""
          directory=""
          className="absolute -mr-1 w-[6rem] opacity-0"
          onChange={handleDirectorySelect}
        />
      </div>
    </Button>
  )
}
