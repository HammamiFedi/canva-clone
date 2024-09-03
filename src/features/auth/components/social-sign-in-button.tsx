"use client";

import { IconType } from "react-icons";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type SocialSignInButtonProps = {
  icon: React.ReactNode;
  label: string;
  provider: "google" | "github";
  disabled?: boolean;
};

export const SocialSignInButton = ({
  icon: Icon,
  label,
  provider,
  disabled
}: SocialSignInButtonProps) => {
  const onProviderSignIn = () => {
    signIn(provider, { callbackUrl: "/" });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="relative w-full"
      disabled={disabled}
      onClick={onProviderSignIn}
    >
      {Icon}
      {label}
    </Button>
  );
};
