"use client";

import { BsBorderWidth } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { ArrowDown, ArrowUp, CopyIcon, TrashIcon } from "lucide-react";

import { ToolbarItem } from "@/features/editor/components/toolbar-item";
import { TextToolbar } from "@/features/editor/components/text-toolbar";
import { ImageToolbar } from "@/features/images/components/image-toolbar";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useToolbar } from "@/features/editor/hooks/use-toolbar";

type ToolbarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const {
    properties,
    isText,
    isImage,
    toggleBold,
    toggleItalic,
    toggleLineThrough,
    toggleUnderline,
    changeTextAlign,
    changeFontSize,
  } = useToolbar({ editor });

  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      {!isImage && (
        <ToolbarItem
          hintLabel="Color"
          onClick={() => onChangeActiveTool("fill")}
          isSelected={activeTool === "fill"}
        >
          <div
            className="size-4 rounded-sm border"
            style={{ backgroundColor: properties.fillColor }}
          />
        </ToolbarItem>
      )}

      {isText ? (
        <TextToolbar
          activeTool={activeTool}
          properties={properties}
          onChangeActiveTool={onChangeActiveTool}
          toggleBold={toggleBold}
          toggleItalic={toggleItalic}
          toggleLineThrough={toggleLineThrough}
          toggleUnderline={toggleUnderline}
          changeTextAlign={changeTextAlign}
          changeFontSize={changeFontSize}
        />
      ) : (
        <>
          <ToolbarItem
            hintLabel="Stroke color"
            onClick={() => onChangeActiveTool("stroke-color")}
            isSelected={activeTool === "stroke-color"}
          >
            <div
              className="size-4 rounded-sm border-2 bg-white"
              style={{ borderColor: properties.strokeColor }}
            />
          </ToolbarItem>

          <ToolbarItem
            hintLabel="Stroke width"
            onClick={() => onChangeActiveTool("stroke-width")}
            isSelected={activeTool === "stroke-width"}
            icon={BsBorderWidth}
          />
        </>
      )}

      {isImage && (
        <ImageToolbar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
      )}

      <ToolbarItem
        hintLabel="Bring forward"
        onClick={() => editor?.bringForward()}
        icon={ArrowUp}
      />

      <ToolbarItem
        hintLabel="Send backwards"
        onClick={() => editor?.sendBackwards()}
        icon={ArrowDown}
      />

      <ToolbarItem
        hintLabel="Opacity"
        onClick={() => onChangeActiveTool("opacity")}
        icon={RxTransparencyGrid}
      />

      <ToolbarItem
        hintLabel="Duplicate"
        onClick={() => editor?.onDuplicate()}
        icon={CopyIcon}
      />

      <ToolbarItem
        hintLabel="Delete"
        onClick={() => editor?.delete()}
        icon={TrashIcon}
        buttonClassName="hover:text-red-500"
      />
    </div>
  );
};
