"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useCommandStore } from "@/lib/stores/command-menu-store"

function SearchBar() {
  const setOpen = useCommandStore((state) => state.setOpen)
  return (
    <Button
      className="m-0 rounded-sm border-[0.09rem] p-0 py-3.5 pl-2 pr-1 text-white/50"
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
        <p className="flex w-[1rem] items-center justify-center rounded-sm border-[0.09rem] text-[0.5rem]">
          ⌘
        </p>
        <p className="flex w-[1rem] items-center justify-center rounded-sm border-[0.09rem] text-[0.5rem]">
          K
        </p>
      </div>
    </Button>
  )
}

export function NavHeader() {
  const pathname = usePathname()
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 font-[family-name:var(--font-geist-mono)]">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 w-px bg-slate-600"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden font-medium md:block">
              ai-web
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">{pathname}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto mr-4 flex items-center">
        <SearchBar />
      </div>
    </header>
  )
}
