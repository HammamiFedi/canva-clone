"use client";

import { usePathname } from "next/navigation";
import {
  CreditCardIcon,
  Crown,
  HomeIcon,
  MessageCircleQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-1 flex-col gap-y-4">
      <div className="px-4">
        <Button
          className="w-full rounded-xl border-none transition"
          variant="default"
          size="lg"
          onClick={() => {}}
        >
          <Crown className="mr-2 size-4 fill-yellow-500 text-yellow-500" />
          Upgrade to image AI Pro
        </Button>
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/"
          icon={HomeIcon}
          label="Home"
          isActive={pathname === "/"}
        />
      </ul>
      <div className="px-3">
        <Separator />
      </div>
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={pathname}
          icon={CreditCardIcon}
          label="Billing"
          onClick={() => {}}
        />
        <SidebarItem
          href="mailto:hammamifedi1997@gmail.com"
          icon={MessageCircleQuestion}
          label="Get Help"
        />
      </ul>
    </div>
  );
};
