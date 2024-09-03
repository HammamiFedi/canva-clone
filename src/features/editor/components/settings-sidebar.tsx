import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ColorPicker } from "@/features/editor/components/color-picker";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";

type SettingsSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const SettingsSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: SettingsSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const workspace = editor?.getWorkspace();

  const initialWidth = workspace?.width || 0;
  const initialHeight = workspace?.height || 0;
  const initialBackgroundColor = workspace?.fill || "#ffffff";

  const [settingsProperties, setSettingsProperties] = useState({
    width: initialWidth,
    height: initialHeight,
    backgroundColor: initialBackgroundColor,
  });

  const onWidthOrHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = parseInt(e.target.value, 10);

    setSettingsProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBackgroundColorChange = (color: string) => {
    setSettingsProperties((prev) => ({
      ...prev,
      backgroundColor: color,
    }));
    editor?.changeWorkspaceBackground(color);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeWorkspaceSize({
      width: settingsProperties.width,
      height: settingsProperties.height,
    });
  };

  useEffect(() => {
    if (workspace) {
      setSettingsProperties((prev) => ({
        ...prev,
        height: workspace.height || 0,
        width: workspace.width || 0,
      }));
    }
  }, [workspace]);

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "settings" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Workspace settings"
        description="Change the look of your workspace"
      />
      <ScrollArea>
        <form className="space-y-4 border-b p-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              name="height"
              type="number"
              placeholder="Enter the desired height of the workspace"
              value={settingsProperties.height}
              onChange={onWidthOrHeightChange}
            />
          </div>
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              name="width"
              type="number"
              placeholder="Enter the desired width of the workspace"
              value={settingsProperties.width}
              onChange={onWidthOrHeightChange}
            />
          </div>
          <Button className="w-full" type="submit">
            Resize
          </Button>
        </form>
        <div className="p-4">
          <ColorPicker
            value={settingsProperties.backgroundColor as string}
            onChange={onBackgroundColorChange}
          />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
