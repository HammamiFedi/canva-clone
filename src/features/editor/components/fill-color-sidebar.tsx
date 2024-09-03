import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor } from "@/features/editor/types";
import { FILL_COLOR } from "@/features/editor/constants";

type FillColorSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FillColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FillColorSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const currentColor = editor?.getActiveFillColor() || FILL_COLOR;
  const onChange = (color: string) => {
    editor?.changeFillColor(color);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "fill" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Fill Color"
        description="Add fill color to your elements"
      />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ColorPicker value={currentColor} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
