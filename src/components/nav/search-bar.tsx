import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useCommandStore } from "@/lib/stores/command-menu-store"

export function SearchBar() {
  const setOpen = useCommandStore((state) => state.setOpen)
  return (
    <Button
      className="m-0 rounded-sm border-[0.1rem] p-0 py-3.5 pl-2 pr-1 text-white/50"
      variant="outline"
      size="xs"
      onClick={() => {
        setOpen(true)
      }}
    >
      <div className="flex flex-row gap-2">
        <Search className="scale-90" />
        <p className="mr-4">Search...</p>
      </div>
      <div className="flex flex-row gap-1">
        <p className="flex w-[1rem] items-center justify-center rounded-sm border-[0.1rem] text-[0.5rem]">
          ⌘
        </p>
        <p className="flex w-[1rem] items-center justify-center rounded-sm border-[0.1rem] text-[0.5rem]">
          K
        </p>
      </div>
    </Button>
  )
}
