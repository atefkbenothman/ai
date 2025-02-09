import { PageContent } from "@/components/page-content"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"

export default function LoginPage() {
  return (
    <PageContent>
      <div className="flex items-center justify-between py-1">
        <div className="ml-2 flex-1 items-center" />
        <div className="flex flex-row items-center justify-center gap-2">
          <SignedOut>
            <p className="text-md font-semibold">Login</p>
          </SignedOut>
          <SignedIn>
            <p className="text-md font-semibold">Logout</p>
          </SignedIn>
        </div>
        <div className="mr-2 flex flex-1 items-center justify-end"></div>
      </div>
      <Separator className="h-[0.09rem]" />
      <div className="flex h-full items-center justify-center">
        <div className="flex w-[20rem] flex-col rounded-sm p-2">
          <SignedOut>
            <SignInButton>
              <Button type="submit" className="w-full rounded-sm">
                Login
              </Button>
            </SignInButton>
            <div className="mt-6 flex flex-row gap-2 text-center text-sm">
              Don&apos;t have an account?{" "}
              <div className="font-semibold underline underline-offset-4 hover:cursor-pointer">
                <SignUpButton>
                  <p>Sign Up</p>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button type="submit" className="w-full rounded-sm">
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </PageContent>
  )
}
