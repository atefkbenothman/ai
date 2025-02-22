import { useState } from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"

export type TreeItemType = [string, TreeItemType[], File?]

export function TreeItem({
  item,
  path,
  onCheck,
  selectedFiles,
}: {
  item: TreeItemType
  path: string[]
  onCheck: (
    path: string[],
    file: File,
    isChecked: boolean,
    isDirectory: boolean,
  ) => void
  selectedFiles: Map<string, File>
}) {
  const [name, children, file] = item
  const currentPath = [...path, name]
  const isChecked = selectedFiles.has(currentPath.join("/"))

  const [isOpen, setIsOpen] = useState(false)

  const handleCheckboxChange = (checked: boolean) => {
    const isDirectory = children.length > 0
    if (!isDirectory && file) {
      // The third parameter was in the wrong position
      onCheck(currentPath, file, checked, false)
    }
    // If it's a directory, handle all children
    if (isDirectory) {
      const updateChildren = (items: TreeItemType[], parentPath: string[]) => {
        items.forEach((childItem) => {
          const [childName, grandChildren, childFile] = childItem
          const childPath = [...parentPath, childName]
          if (childFile) {
            // Fix here too
            onCheck(childPath, childFile, checked, false)
          }
          if (grandChildren.length > 0) {
            updateChildren(grandChildren, childPath)
          }
        })
      }
      updateChildren(children, currentPath)
    }
  }

  if (children.length === 0) {
    return (
      <div className="flex items-center justify-between space-x-2 py-1 pr-2 text-sm text-white/90">
        <div className="flex items-center space-x-2">
          <File className="h-4 w-4" />
          <span>{name}</span>
        </div>
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className="border-white/40"
        />
      </div>
    )
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between space-x-2 py-1 pr-2 text-sm">
        <div className="flex items-center space-x-2">
          <CollapsibleTrigger asChild>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <ChevronRight
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
          </CollapsibleTrigger>
          <Folder className="h-4 w-4" />
          <span>{name}</span>
        </div>
        <Checkbox
          checked={isChecked}
          onCheckedChange={handleCheckboxChange}
          className="border-white/40"
        />
      </div>
      <CollapsibleContent>
        <div className="ml-6 border-l border-gray-300 pl-2">
          {children.map((subItem, index) => (
            <TreeItem
              key={index}
              item={subItem}
              path={currentPath}
              onCheck={onCheck}
              selectedFiles={selectedFiles}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
