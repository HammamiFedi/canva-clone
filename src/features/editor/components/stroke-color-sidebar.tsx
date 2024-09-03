import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor } from "@/features/editor/types";
import { STROKE_COLOR } from "@/features/editor/constants";

type StrokeColorSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const StrokeColorSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeColorSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const currentColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const onChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-color" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Add stroke color to your elements"
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
