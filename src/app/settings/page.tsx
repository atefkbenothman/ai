"use server"

import { PageContent } from "@/components/page-content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiSettings } from "@/components/settings/api-settings"

function ProfileSettings() {
  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

const tabs = {
  API: <ApiSettings />,
  Profile: <ProfileSettings />,
}

export default async function Settings() {
  return (
    <PageContent>
      <Tabs defaultValue="API" className="text-sm">
        <TabsList>
          {Object.keys(tabs).map((name) => (
            <TabsTrigger key={name} value={name}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(tabs).map(([name, component]) => (
          <TabsContent
            key={name}
            value={name}
            className="w-full py-2 md:w-1/2 lg:w-1/3"
          >
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </PageContent>
  )
}
