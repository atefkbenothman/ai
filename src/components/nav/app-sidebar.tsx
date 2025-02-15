"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs"
import { User } from "lucide-react"
import { navigationItems } from "@/lib/nav-items"

function NavSection({ currentPath }: { currentPath: string }) {
  return (
    <SidebarMenu className="gap-2">
      {navigationItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className="items-center gap-4"
            isActive={
              currentPath === item.url ||
              (item.url === "/" && currentPath === "")
            }
          >
            <Link href={item.url} className="text-lg font-medium">
              <item.icon strokeWidth={2.3} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function UserSection({ currentPath }: { currentPath: string }) {
  const { user } = useUser()
  return (
    <SidebarMenu className="gap-3">
      <SignedOut>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="items-center gap-4"
            isActive={currentPath === "/login"}
          >
            <Link href="/login" className="text-lg font-medium">
              <User strokeWidth={2.3} />
              <span>Log In</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SignedOut>
      <SignedIn>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="items-center gap-4"
            isActive={currentPath === "/login"}
          >
            <Link href="/login" className="text-lg font-medium">
              <User strokeWidth={2.3} />
              <span>{user?.fullName}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SignedIn>
    </SidebarMenu>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavSection currentPath={pathname} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupContent>
          <UserSection currentPath={pathname} />
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  )
}
