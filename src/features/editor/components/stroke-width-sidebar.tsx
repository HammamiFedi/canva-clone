import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { STROKE_DASH_ARRAY, STROKE_WIDTH } from "@/features/editor/constants";
import { cn } from "@/lib/utils";

type StrokeWidthSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const StrokeWidthSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: StrokeWidthSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const currentStrokeWidth = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const currentStrokeType =
    editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;

  const onChangeStrokeWidth = (width: number) => {
    editor?.changeStrokeWidth(width);
  };

  const onChangeStrokeType = (value: number[]) => {
    editor?.changeStrokeDashArray(value);
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "stroke-width" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Stroke options"
        description="Modify the stroke of your elements"
      />
      <ScrollArea>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Stroke width</Label>
          <Slider
            value={[currentStrokeWidth]}
            onValueChange={(values) => onChangeStrokeWidth(values[0])}
          />
        </div>
        <div className="space-y-6 border-b p-4">
          <Label className="text-sm">Stroke type</Label>
          <Button
            className={cn(
              "h-16 w-full justify-start text-left",
              currentStrokeType.length === 0
                ? "border-2 border-blue-500"
                : "hover:border hover:border-blue-500",
            )}
            variant="secondary"
            size="lg"
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full rounded-full border-4 border-black" />
          </Button>
          <Button
            className={cn(
              "h-16 w-full justify-start text-left",
              currentStrokeType.length !== 0
                ? "border-2 border-blue-500"
                : "hover:border hover:border-blue-500",
            )}
            variant="secondary"
            size="lg"
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full rounded-full border-4 border-dashed border-black" />
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
