import { TbColorFilter } from "react-icons/tb";

import { ToolbarItem } from "@/features/editor/components/toolbar-item";
import { ActiveTool } from "@/features/editor/types";
import { SquareSplitHorizontal } from "lucide-react";

type ImageToolbarProps = {
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ImageToolbar = ({
  activeTool,
  onChangeActiveTool,
}: ImageToolbarProps) => {
  return (
    <>
      <ToolbarItem
        hintLabel="Filters"
        isSelected={activeTool === "filter"}
        icon={TbColorFilter}
        onClick={() => onChangeActiveTool("filter")}
      />

      <ToolbarItem
        hintLabel="Remove background"
        isSelected={activeTool === "remove-bg"}
        icon={SquareSplitHorizontal}
        onClick={() => onChangeActiveTool("remove-bg")}
      />
    </>
  );
};
