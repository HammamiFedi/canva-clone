import { useEffect } from "react";
import { fabric } from "fabric";

type UseCanvasEventsProps = {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  onClearSelection: () => void;
  save: () => void;
};

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
  onClearSelection,
  save,
}: UseCanvasEventsProps) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        onClearSelection();
      });

      canvas.on("object:added", () => save());
      canvas.on("object:modified", () => save());
      canvas.on("object:removed", () => save());
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
        canvas.off("object:added");
        canvas.off("object:modified");
        canvas.off("object:removed");
      }
    };
  }, [
    canvas,
    onClearSelection,
    setSelectedObjects, // No need for this, this is just to satisfy the linter
    save,
  ]);
};
