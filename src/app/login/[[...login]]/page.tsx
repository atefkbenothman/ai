import { PageContent } from "@/components/page-content"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <PageContent>
      <div className="flex items-center justify-between py-1">
        <div className="ml-2 flex-1 items-center" />
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-md font-semibold">Login</p>
        </div>
        <div className="mr-2 flex flex-1 items-center justify-end"></div>
      </div>
      <Separator className="h-[0.1rem]" />
      <div className="flex h-full items-center justify-center">
        <div className="flex w-[20rem] flex-col rounded-sm p-2">
          <Button type="submit" className="w-full rounded-sm">
            Login
          </Button>
          <div className="mt-6 flex flex-row gap-2 text-center text-sm">
            Don&apos;t have an account?{" "}
            <div className="font-semibold underline underline-offset-4 hover:cursor-pointer">
              <p>Sign Up</p>
            </div>
          </div>
        </div>
      </div>
    </PageContent>
  )
}
