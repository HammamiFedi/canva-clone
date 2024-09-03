import { useCallback, useState, useMemo, useRef } from "react";
import { fabric } from "fabric";

import { useAutoResize } from "@/features/editor/hooks/use-auto-resize";
import { useCanvasEvents } from "@/features/editor/hooks/use-canvas-events";
import { useBuildEditor } from "@/features/editor/hooks/use-build-editor";
import { useHistory } from "@/features/editor/hooks/use-history";
import { useWindowEvents } from "@/features/editor/hooks/use-window-events";
import { useLoadState } from "@/features/editor/hooks/use-load-state";
import {
  DEFAULT_FONT_FAMILY,
  FILL_COLOR,
  JSON_KEYS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "@/features/editor/constants";

type UseEditorProps = {
  defaultState?: string;
  defaultHeight?: number;
  defaultWidth?: number;
  onClearSelection: () => void;
  saveCallback?: (values: {
    json: string;
    height: number;
    width: number;
  }) => void;
};

export const useEditor = ({
  defaultState,
  defaultHeight,
  defaultWidth,
  onClearSelection,
  saveCallback,
}: UseEditorProps) => {
  // Store the initial state and dimensions in Refs to prevent re-renders
  const initialState = useRef(defaultState);
  const initialHeight = useRef(defaultHeight);
  const initialWidth = useRef(defaultWidth);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [fontFamily, setFontFamily] = useState<string>(DEFAULT_FONT_FAMILY);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  // Hooks
  const { autoZoom } = useAutoResize({ canvas, container });

  const { canvasHistory, save, canRedo, canUndo, redo, undo, setHistoryIndex } =
    useHistory({ canvas, saveCallback });

  useCanvasEvents({ canvas, setSelectedObjects, onClearSelection, save });

  useWindowEvents();

  useLoadState({
    initialState,
    canvasHistory,
    canvas,
    autoZoom,
    setHistoryIndex,
  });

  const { editor } = useBuildEditor({
    canvas,
    fillColor,
    strokeColor,
    strokeWidth,
    strokeDashArray,
    fontFamily,
    selectedObjects,
    setFillColor,
    setStrokeColor,
    setStrokeWidth,
    setStrokeDashArray,
    setFontFamily,
    autoZoom,
    save,
    redo,
    undo,
    canRedo,
    canUndo,
  });

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      // Style the Controls
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

      // Create a workspace
      const initialWorkspace = new fabric.Rect({
        width: initialWidth.current,
        height: initialHeight.current,
        name: "clip",
        fill: "white",
        // Set selectable to false to prevent the workspace from being selected
        selectable: false,
        // Set hasControls to false to prevent the workspace from being resized
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0,0,0,0.8)",
          blur: 5,
        }),
      });

      // Set the canvas size to the container size
      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);

      // Add the workspace to the canvas
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      // Every element outside the workspace will be invisible
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS));
      canvasHistory.current.push(currentState);
      setHistoryIndex(0);
    },
    [],
  );

  return {
    init,
    editor,
  };
};
