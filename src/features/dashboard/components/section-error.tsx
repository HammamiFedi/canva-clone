import { AlertTriangle } from "lucide-react";

type SectionErrorProps = {
  title: string;
  message: string;
};

export const SectionError = ({ title, message }: SectionErrorProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex h-32 flex-col items-center justify-center gap-y-4">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
