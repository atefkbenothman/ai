"use client"

import { Separator } from "@radix-ui/react-separator"
import { SidebarTrigger } from "../ui/sidebar"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function NavHeader() {
  const pathname = usePathname()
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 font-[family-name:var(--font-geist-mono)] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
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
    </header>
  )
}
