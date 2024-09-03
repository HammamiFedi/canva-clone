import { useEffect, useRef } from "react";
import { fabric } from "fabric";

import { JSON_KEYS } from "@/features/editor/constants";

type UseLoadStateProps = {
  initialState: React.MutableRefObject<string | undefined>;
  canvasHistory: React.MutableRefObject<string[]>;
  canvas: fabric.Canvas | null;
  autoZoom: () => void;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useLoadState = ({
  initialState,
  canvasHistory,
  canvas,
  autoZoom,
  setHistoryIndex,
}: UseLoadStateProps) => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && initialState.current && canvas) {
      // Load the initial state
      const dataToBeLoaded = JSON.parse(initialState.current);

      canvas.loadFromJSON(dataToBeLoaded, () => {
        const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));

        canvasHistory.current = [currentState];
        setHistoryIndex(0);
        autoZoom();
      });
      initialized.current = true;
    }
  }, [canvas, autoZoom]);
};
