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
import { Home, MessageCircle, Settings, User } from "lucide-react"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="items-center gap-4"
                    isActive={
                      pathname === item.url ||
                      (item.url === "/" && pathname === "")
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <SidebarGroupContent>
          <SidebarMenu className="gap-2">
            <SignedOut>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="items-center gap-4"
                  isActive={pathname === "/login"}
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
                  isActive={pathname === "/login"}
                >
                  <Link href="/login" className="text-lg font-medium">
                    <User strokeWidth={2.3} />
                    <span>{user?.fullName}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SignedIn>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarFooter>
    </Sidebar>
  )
}
