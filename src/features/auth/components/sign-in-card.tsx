"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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

export const SignInCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const params = useSearchParams();
  const error = params.get("error");

  const onCredentialsSignIn = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    signIn("credentials", {
      email,
      password,
      callbackUrl: "/", // Redirect to home page after login
    });
  };

  return (
    <Card className="h-auto w-[90%] p-8 md:w-[420px]">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="mb-6 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          <TriangleAlert className="size-4" />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-5" onSubmit={onCredentialsSignIn}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            maxLength={20}
          />
          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <SocialSignInButton
            label="Continue with Google"
            provider="google"
            icon={<FcGoogle className="absolute left-2.5 top-3 mr-2 size-5" />}
          />
          <SocialSignInButton
            label="Continue with Github"
            provider="github"
            icon={<FaGithub className="absolute left-2.5 top-3 mr-2 size-5" />}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account ?
          <Link href="/sign-up">
            <span className="ml-2 text-sky-700 hover:underline">Sign up</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
