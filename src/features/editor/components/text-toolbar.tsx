import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { ChevronDown } from "lucide-react";

import { ToolbarItem } from "@/features/editor/components/toolbar-item";
import { FontSizeInput } from "@/features/editor/components/font-size-input";
import {
  ActiveTool,
  TextAlign,
  ToolbarProperties,
} from "@/features/editor/types";
import { PARAGRAPH_FONT_WEIGHT } from "@/features/editor/constants";

type TextToolbarProps = {
  activeTool: ActiveTool;
  properties: ToolbarProperties;
  onChangeActiveTool: (tool: ActiveTool) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleLineThrough: () => void;
  toggleUnderline: () => void;
  changeTextAlign: (value: TextAlign) => void;
  changeFontSize: (value: number) => void;
};

export const TextToolbar = ({
  activeTool,
  properties,
  onChangeActiveTool,
  toggleBold,
  toggleItalic,
  toggleLineThrough,
  toggleUnderline,
  changeTextAlign,
  changeFontSize,
}: TextToolbarProps) => {
  return (
    <>
      <ToolbarItem
        hintLabel="Font"
        onClick={() => onChangeActiveTool("font")}
        isSelected={activeTool === "font"}
        buttonClassName="h-full w-auto px-2 text-sm"
      >
        <div className="max-w-[100px] truncate">{properties.fontFamily}</div>
        <ChevronDown className="ml-2 size-4 shrink-0" />
      </ToolbarItem>

      <FontSizeInput value={properties.fontSize} onChange={changeFontSize} />

      <ToolbarItem
        hintLabel="Bold"
        icon={FaBold}
        onClick={toggleBold}
        isSelected={properties.fontWeight > PARAGRAPH_FONT_WEIGHT}
      />

      <ToolbarItem
        hintLabel="Italic"
        icon={FaItalic}
        onClick={toggleItalic}
        isSelected={properties.fontStyle === "italic"}
      />

      <ToolbarItem
        hintLabel="Underline"
        icon={FaUnderline}
        onClick={toggleUnderline}
        isSelected={properties.isTextUnderline}
      />

      <ToolbarItem
        hintLabel="Line through"
        icon={FaStrikethrough}
        onClick={toggleLineThrough}
        isSelected={properties.isTextLinethrough}
      />

      <ToolbarItem
        hintLabel="Align left"
        icon={FaAlignLeft}
        onClick={() => changeTextAlign("left")}
        isSelected={properties.textAlign === "left"}
      />

      <ToolbarItem
        hintLabel="Align center"
        icon={FaAlignCenter}
        onClick={() => changeTextAlign("center")}
        isSelected={properties.textAlign === "center"}
      />

      <ToolbarItem
        hintLabel="Align right"
        icon={FaAlignRight}
        onClick={() => changeTextAlign("right")}
        isSelected={properties.textAlign === "right"}
      />
    </>
  );
};
