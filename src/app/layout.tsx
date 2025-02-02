import localFont from "next/font/local"
import { cookies } from "next/headers"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/nav/app-sidebar"
import NavHeader from "@/components/nav/nav-header"

const pretendardFont = localFont({ src: "../fonts/pretendard.woff2" })

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ai-web",
  description: "ai-web",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en">
      {/* <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head> */}
      <body
        className={`${geistMono.variable} ${pretendardFont.className} dark antialiased`}
      >
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <SidebarInset>
            <NavHeader />
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
