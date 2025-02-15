import type { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import { Geist_Mono } from "next/font/google"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/app-sidebar"
import { NavHeader } from "@/components/nav/nav-header"
import { CommandMenu } from "@/components/command-menu"
import { Toaster } from "sonner"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ai-web",
  description: "ai-web",
}

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <ClerkProvider>
      <html lang="en">
        {/* <head>
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        </head> */}
        <body className={`${geistMono.variable} dark max-w-full antialiased`}>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <CommandMenu />
            <SidebarInset>
              <NavHeader />
              <main>{children}</main>
            </SidebarInset>
            <Toaster position="bottom-right" />
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
