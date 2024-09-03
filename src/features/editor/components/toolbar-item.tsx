import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToolbarItemProps = {
  hintLabel: string;
  onClick: () => void;
  children?: React.ReactNode;
  icon?: IconType | LucideIcon;
  isSelected?: boolean;
  buttonClassName?: string;
};

export const ToolbarItem = ({
  hintLabel,
  onClick,
  children,
  icon: Icon,
  isSelected,
  buttonClassName,
}: ToolbarItemProps) => {
  return (
    <Hint label={hintLabel} sideOffset={5}>
      <Button
        className={cn("h-full", buttonClassName, isSelected && "bg-gray-100")}
        variant="ghost"
        size="icon"
        onClick={onClick}
      >
        {Icon ? <Icon className="size-4" /> : children}
      </Button>
    </Hint>
  );
};
