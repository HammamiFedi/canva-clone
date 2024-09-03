"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TriangleAlert } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialSignInButton } from "@/features/auth/components/social-sign-in-button";

import { useSignUp } from "@/features/auth/api/use-sign-up";

export const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutate, isPending, error } = useSignUp();

  const onCredentialsSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutate(
      { email, password, name },
      {
        onSuccess: () => {
          toast.success("You have signed up successfully");
          signIn("credentials", { email, password, callbackUrl: "/" });
        },
      },
    );
  };

  return (
    <Card className="h-auto w-[90%] p-8 md:w-[420px]">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>{error.message}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-5" onSubmit={onCredentialsSignUp}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            required
            minLength={8}
            maxLength={20}
          />
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isPending}
          >
            Register
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <SocialSignInButton
            label="Continue with Google"
            provider="google"
            icon={<FcGoogle className="absolute left-2.5 top-3 mr-2 size-5" />}
            disabled={isPending}
          />
          <SocialSignInButton
            label="Continue with Github"
            provider="github"
            icon={<FaGithub className="absolute left-2.5 top-3 mr-2 size-5" />}
            disabled={isPending}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account ?
          <Link href="/sign-in">
            <span className="ml-2 text-sky-700 hover:underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
