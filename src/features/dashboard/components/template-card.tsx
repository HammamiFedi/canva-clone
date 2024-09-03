import Image from "next/image";

import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

type TemplateCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  width: number;
  height: number;
  isPro: boolean | null;
  disabled?: boolean;
  onClick: () => void;
};

export const TemplateCard = ({
  title,
  imageSrc,
  description,
  width,
  height,
  isPro,
  disabled,
  onClick,
}: TemplateCardProps) => {
  return (
    <button
      className={cn(
        "group flex flex-col space-y-2 text-left transition",
        disabled ? "cursor-not-allowed opacity-75" : "cursor-pointer",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-xl border shadow-md"
        style={{
          aspectRatio: `${width}/${height}`,
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="transform object-cover transition group-hover:scale-105"
        />
        {isPro && (
          <div className="absolute right-2 top-2 z-[10] flex size-10 items-center justify-center rounded-full bg-black/50">
            <Crown className="size-5 fill-yellow-500 text-yellow-500" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/15 opacity-0 backdrop-blur-sm backdrop-filter transition group-hover:opacity-100">
          <p className="font-medium text-white">Open in editor</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-75">
          {description}
        </p>
      </div>
    </button>
  );
};
