import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor, Filter } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FILTERS } from "@/features/editor/constants";

type FilterSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FilterSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onFilterChange = (filter: Filter) => {
    editor?.changeImageFilter(filter);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "filter" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Filters options"
        description="Apply a filter to a selected image"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              size="lg"
              className="h-16 w-full justify-start px-4 py-2 text-left text-base capitalize hover:border hover:border-blue-500"
              onClick={() => onFilterChange(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
