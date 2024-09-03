/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import debounce from "lodash.debounce";

import { Navbar } from "@/features/editor/components/navbar";
import { Sidebar } from "@/features/editor/components/sidebar";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Footer } from "@/features/editor/components/footer";
import { ShapeSidebar } from "@/features/editor/components/shape-sidebar";
import { FillColorSidebar } from "@/features/editor/components/fill-color-sidebar";
import { StrokeColorSidebar } from "@/features/editor/components/stroke-color-sidebar";
import { StrokeWidthSidebar } from "@/features/editor/components/stroke-width-sidebar";
import { OpacitySidebar } from "@/features/editor/components/opacity-sidebar";
import { TextSidebar } from "@/features/editor/components/text-sidebar";
import { FontSidebar } from "@/features/editor/components/font-sidebar";
import { ImageSidebar } from "@/features/images/components/image-sidebar";
import { FilterSidebar } from "@/features/editor/components/filter-sidebar";
import { AiSidebar } from "@/features/editor/components/ai-sidebar";
import { RemoveBgSidebar } from "@/features/editor/components/remobe-bg-sidebar";
import { DrawSidebar } from "@/features/editor/components/draw-sidebar";
import { SettingsSidebar } from "@/features/editor/components/settings-sidebar";
import { TemplateSidebar } from "@/features/editor/components/template-sidebar";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { ActiveTool } from "@/features/editor/types";
import { SELECTION_DEPENDANT_TOOLS } from "@/features/editor/constants";

import { UseGetProjectResponseType } from "@/features/projects/api/use-get-project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

type EditorProps = {
  initialData: UseGetProjectResponseType["data"];
};

export const Editor = ({ initialData }: EditorProps) => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  // Mutations
  const { mutate } = useUpdateProject(initialData.id);

  // Make canvas resizable by wrapping it in a div
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const debouncedSave = useCallback(
    debounce((values: { json: string; height: number; width: number }) => {
      mutate(values);
    }, 700),
    [mutate],
  );

  const onClearSelection = useCallback(() => {
    if (SELECTION_DEPENDANT_TOOLS.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultHeight: initialData.height,
    defaultWidth: initialData.width,
    onClearSelection,
    saveCallback: debouncedSave,
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") {
        editor?.enableDrawingMode();
      }

      if (activeTool === "draw") {
        editor?.disableDrawingMode();
      }

      if (activeTool === tool) {
        return setActiveTool("select");
      }
      setActiveTool(tool);
    },
    [activeTool, editor],
  );

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      // Controls are displayed outsise the canvas
      controlsAboveOverlay: true,
      // Preserve objects stacking order
      preserveObjectStacking: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar
        id={initialData.id}
        projectName={initialData.name}
        activeTool={activeTool}
        editor={editor}
        onChangeActiveTool={onChangeActiveTool}
      />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <SettingsSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <TemplateSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            key={JSON.stringify(editor?.canvas.getActiveObject())}
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
          />
          {/* Canvas */}
          <div
            ref={containerRef}
            className="h-[calc(100%-124px)] flex-1 bg-muted"
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};
