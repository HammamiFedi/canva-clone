"use client";

import { useSession, signOut } from "next-auth/react";
import { CreditCard, Loader, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data.user?.name!;
  const imageUrl = session.data.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        {/* TODO: Add crown if user is premium */}
        <Avatar className="siez-10 cursor-pointer transition hover:opacity-75">
          <AvatarImage src={imageUrl || ""} alt={name} />
          <AvatarFallback className="bg-blue-500 font-medium text-white">
            {name.charAt(0).toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          className="h-10 cursor-pointer"
          onClick={() => {}}
          disabled={false}
        >
          <CreditCard className="mr-2 size-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-10 cursor-pointer"
          onClick={() => signOut()}
          disabled={false}
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
