import {
  SignUpButton,
  SignInButton,
  SignedOut,
  ClerkLoaded,
  SignedIn,
  UserButton,
  ClerkLoading,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <img src="/logo.png" alt="logo" className="h-15" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Accentra
          </h1>
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <div >
            <SignedOut >
              <SignInButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                <Button size="lg" variant="ghost" >Login</Button>
              </SignInButton>
              <SignUpButton mode="modal" afterSignInUrl="/learn" afterSignUpUrl="/learn">
                <Button size="lg" variant="ghost"> Signup </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </ClerkLoaded>
      </div>
    </header>
  );
};
