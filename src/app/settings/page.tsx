"use server"

import { PageContent } from "@/components/page-content"
import { Settings } from "@/components/settings/settings"
import { Separator } from "@/components/ui/separator"

export default async function SettingsPage() {
  return (
    <PageContent>
      <div className="flex items-center justify-between py-1">
        <div className="ml-2 flex-1 items-center" />
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-md font-semibold">Settings</p>
        </div>
        <div className="mr-2 flex flex-1 items-center justify-end"></div>
      </div>
      <Separator className="h-[0.09rem]" />
      <div className="flex h-full w-full items-center justify-center">
        <Settings />
      </div>
    </PageContent>
  )
}
