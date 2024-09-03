import { useCallback, useRef } from "react";
import { fabric } from "fabric";

type UseClipboardProps = {
  canvas: fabric.Canvas | null;
};

export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<fabric.Object | null>(null);

  const copy = useCallback(() => {
    canvas?.getActiveObject()?.clone((cloned: fabric.Object) => {
      clipboard.current = cloned;
    });
  }, [canvas]);

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((cloned: fabric.ActiveSelection) => {
      canvas?.discardActiveObject();

      if (cloned) {
        cloned.set({
          left: cloned.left ? cloned.left + 10 : 10,
          top: cloned.top ? cloned.top + 10 : 10,
          evented: true,
        });

        if (cloned.type === "activeSelection") {
          cloned.canvas = canvas as fabric.Canvas;
          // @ ts-ignore
          cloned.forEachObject((obj) => {
            canvas?.add(obj);
          });
          cloned.setCoords();
        } else {
          canvas?.add(cloned);
        }

        if (clipboard.current) {
          clipboard.current.top = (clipboard.current.top || 0) + 10;
          clipboard.current.left = (clipboard.current.left || 0) + 10;
        }

        canvas?.setActiveObject(cloned);
        canvas?.requestRenderAll();
      }
    });
  }, [canvas]);

  return { copy, paste };
};
