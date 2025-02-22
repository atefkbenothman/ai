"use client"

import { type TreeItemType } from "@/components/filetree/tree-item"
import { useState } from "react"
import { TreeItem } from "@/components/filetree/tree-item"
import { FileInput } from "@/components/filetree/file-input"
import { useFileTree } from "@/lib/stores/file-tree-store"

declare module "react" {
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    directory?: string
    webkitdirectory?: string
  }
}

export function FileTree() {
  const selectedFiles = useFileTree((state) => state.selectedFiles)
  const addFile = useFileTree((state) => state.addFile)
  const removeFile = useFileTree((state) => state.removeFile)

  const [treeData, setTreeData] = useState<TreeItemType[]>([])

  const handleCheck = (
    path: string[],
    file: File,
    isChecked: boolean,
    isDirectory: boolean,
  ) => {
    if (isDirectory) return
    const pathString = path.join("/")
    if (isChecked) {
      addFile(pathString, file)
    } else {
      removeFile(pathString)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {treeData.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <FileInput setTreeData={setTreeData} />
        </div>
      ) : (
        <div className="no-scrollbar flex h-full w-full flex-col p-4">
          <div className="mb-4 rounded-sm border-[0.1rem] p-2 text-sm font-medium text-white/70">
            <p>Selected Files: {selectedFiles.size} files</p>
          </div>
          <div className="flex-1 overflow-auto">
            {treeData.map((item, index) => (
              <TreeItem
                key={index}
                item={item}
                path={[]}
                onCheck={handleCheck}
                selectedFiles={selectedFiles}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
