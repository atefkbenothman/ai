import { PageContent } from "@/components/page-content"
import { Button } from "@/components/ui/button"
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
      <div className="flex h-full items-center justify-center">
        <div className="flex w-[16rem] flex-col">
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
