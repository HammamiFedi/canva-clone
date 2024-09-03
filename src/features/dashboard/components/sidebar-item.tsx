import Link from "next/link";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const SidebarItem = ({
  icon: Icon,
  href,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "flex items-center rounded-xl bg-transparent px-3 py-3 transition hover:bg-white",
          isActive && "bg-white",
        )}
      >
        <Icon className="mr-2 size-4 stroke-2" />
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
};
