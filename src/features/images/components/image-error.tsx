import { AlertTriangle } from "lucide-react";

type ImageErrorProps = {
  errorDescription: string;
};

export const ImageError = ({ errorDescription }: ImageErrorProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4">
      <AlertTriangle className="size-4 text-muted-foreground" />
      <p className="text-xs text-muted-foreground">{errorDescription}</p>
    </div>
  );
};
