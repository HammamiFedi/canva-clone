import { Loader } from "lucide-react";

type SectionLoaderProps = {
  title: string;
};

export const SectionLoader = ({ title }: SectionLoaderProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex h-32 flex-col items-center justify-center gap-y-4">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    </div>
  );
};
