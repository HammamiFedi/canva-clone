import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor } from "@/features/editor/types";
import { STROKE_COLOR, STROKE_WIDTH } from "@/features/editor/constants";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type DrawSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const DrawSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: DrawSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
    editor?.disableDrawingMode();
  };

  const currentStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const currentStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;

  const onColorChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };
  const onWidthChange = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "draw" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Drawing mode"
        description="Modify brush settings"
      />
      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Brish width</Label>
          <Slider
            value={[currentStrokeWidth]}
            onValueChange={(values) => onWidthChange(values[0])}
          />
        </div>
        <div className="space-y-6 p-4">
          <ColorPicker value={currentStrokeColor} onChange={onColorChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
