import { useState, useEffect, useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type OpacitySidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const OpacitySidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: OpacitySidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const initialOpacity = editor?.getActiveOpacity() || 1;
  const selectedObject = useMemo(() => {
    return editor?.selectedObjects[0];
  }, [editor?.selectedObjects]);

  const [currentOpacity, setCurrentOpacity] = useState(initialOpacity);

  const onChangeOpacity = (value: number) => {
    editor?.changeOpacity(value);
    setCurrentOpacity(value);
  };

  useEffect(() => {
    if (selectedObject) {
      setCurrentOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "opacity" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Opacity options"
        description="Change the opacity of the selected objects"
      />
      <ScrollArea>
        <div className="p-5">
          <Slider
            value={[currentOpacity]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={(values) => onChangeOpacity(values[0])}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
