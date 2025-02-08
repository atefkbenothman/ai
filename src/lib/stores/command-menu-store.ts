import { create } from "zustand"

type CommandStore = {
  open: boolean
  search: string
  selectedIndex: number
  setOpen: (open: boolean) => void
  setSearch: (search: string) => void
  setSelectedIndex: (index: number) => void
  toggleMenu: () => void
  reset: () => void
}

export const useCommandStore = create<CommandStore>((set) => ({
  open: false,
  search: "",
  selectedIndex: 0,
  setOpen: (open) => set({ open }),
  setSearch: (search) => set({ search }),
  setSelectedIndex: (selectedIndex) => set({ selectedIndex }),
  toggleMenu: () => set((state) => ({ open: !state.open })),
  reset: () => set({ search: "", selectedIndex: 0 }),
}))
