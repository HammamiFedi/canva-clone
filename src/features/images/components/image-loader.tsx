import { Loader } from "lucide-react";

export const ImageLoader = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader className="size-4 animate-spin text-muted-foreground" />
    </div>
  );
};
