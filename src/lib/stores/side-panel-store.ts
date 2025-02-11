import { create } from "zustand"

export type SidePanelStore = {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const useSidePanel = create<SidePanelStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))
