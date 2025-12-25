import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AuthForm } from "@/components/auth-form";
import { Icons } from "@/components/icons";

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'login-background');

  return (
    <div className="relative min-h-screen w-full">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          data-ai-hint={bgImage.imageHint}
          fill
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative container grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-background/50" />
            <div className="relative z-20 flex items-center text-lg font-medium">
                <Icons.logo className="mr-2 h-6 w-6"/>
                Idea Inbox
            </div>
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                <p className="text-lg">
                    &ldquo;The best way to have a good idea is to have a lot of ideas.&rdquo;
                </p>
                <footer className="text-sm">&mdash; Linus Pauling</footer>
                </blockquote>
            </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-primary">
                Welcome Back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credentials to access your inbox
              </p>
            </div>
            <AuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
