import { PageContent } from "@/components/containers/page-content"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ApiSettings() {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="apiKey" className="text-sm">Groq API Key</Label>
      <Input
        id="apiKey"
        type="password"
        placeholder=""
        defaultValue={process.env.NEXT_PUBLIC_API_KEY}
        className="m-0 h-7 px-2"
        required
      />
    </div>
  )
}

function ProfileSettings() {
  return (
    <div>
      <p>Profile</p>
    </div>
  )
}

const tabs = {
  "API": <ApiSettings />,
  "Profile": <ProfileSettings />
}

export default function Settings() {
  return (
    <PageContent>
      <Tabs defaultValue="API" className="text-sm">
        <TabsList>
          {Object.keys(tabs).map((name) => (
            <TabsTrigger key={name} value={name}>{name}</TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(tabs).map(([name, component]) => (
          <TabsContent
            key={name}
            value={name}
            className="py-2 w-full md:w-1/2 lg:w-1/3"
          >
            {component}
          </TabsContent>
        ))}
      </Tabs>
    </PageContent>
  )
}