import { Search } from "lucide-react";

type SectionNoDataFoundProps = {
  title: string;
  message: string;
};

export const SectionNoDataFound = ({
  title,
  message,
}: SectionNoDataFoundProps) => {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex h-32 flex-col items-center justify-center gap-y-4">
        <Search className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
