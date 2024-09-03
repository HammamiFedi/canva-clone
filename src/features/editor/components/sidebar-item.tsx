import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
};

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex aspect-video h-full w-full flex-col rounded-none p-3 py-4",
        isActive && "bg-muted text-primary",
      )}
      onClick={onClick}
    >
      <Icon className="size-5 shrink-0 stroke-2" />
      <span className="mt-2 text-xs">{label}</span>
    </Button>
  );
};
