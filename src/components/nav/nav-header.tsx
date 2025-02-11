"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SearchBar } from "@/components/nav/search-bar"
import { usePathname } from "next/navigation"

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
