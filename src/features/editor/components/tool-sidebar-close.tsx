import { ChevronsLeft } from "lucide-react";

type ToolSidebarCloseProps = {
  onClick: () => void;
};

export const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <button
      className="group absolute -right-[1.80rem] top-1/2 flex h-[70px] items-center justify-center rounded-r-xl border-y border-r bg-white px-1 pr-2"
      onClick={onClick}
    >
      <ChevronsLeft className="size-4 text-black transition group-hover:opacity-75" />
    </button>
  );
};
