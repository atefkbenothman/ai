"use server"

import { PageContent } from "@/components/page-content"
import { Separator } from "@/components/ui/separator"
// import { createClerkSupabaseClientSsr } from "@/server/supabase/server"

export default async function Home() {
  // const client = await createClerkSupabaseClientSsr()
  // const { data, error } = await client.from("providers").select()
  // if (error) {
  //   console.error(error)
  // }
  // const providers = data

  return (
    <PageContent>
      <div className="flex items-center justify-between py-1">
        <div className="ml-2 flex-1 items-center" />
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-md font-semibold">Home</p>
        </div>
        <div className="mr-2 flex flex-1 items-center justify-end"></div>
      </div>
      <Separator className="h-[0.09rem]" />
      {/* {providers?.map((provider: any, idx: number) => (
        <p key={idx}>{provider.id} - {provider.name}</p>
      ))} */}
    </PageContent>
  )
}
