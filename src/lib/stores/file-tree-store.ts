import { create } from "zustand"

type FileTreeStore = {
  selectedFiles: Map<string, File>
  addFile: (path: string, file: File) => void
  removeFile: (path: string) => void
  clearFiles: () => void
}

export const useFileTree = create<FileTreeStore>((set) => ({
  selectedFiles: new Map(),
  addFile: (path, file) =>
    set((state) => {
      const newFiles = new Map(state.selectedFiles)
      newFiles.set(path, file)
      return { selectedFiles: newFiles }
    }),
  removeFile: (path) =>
    set((state) => {
      const newFiles = new Map(state.selectedFiles)
      newFiles.delete(path)
      return { selectedFiles: newFiles }
    }),
  clearFiles: () => set({ selectedFiles: new Map() }),
}))
