import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ShapeToolProps = {
  onClick: () => void;
  icon: LucideIcon | IconType;
  iconClassName?: string;
};

export const ShapeTool = ({
  icon: Icon,
  iconClassName,
  onClick,
}: ShapeToolProps) => {
  return (
    <button className="aspect-square rounded-md border p-5" onClick={onClick}>
      <Icon className={cn("h-full w-full", iconClassName)} />
    </button>
  );
};
