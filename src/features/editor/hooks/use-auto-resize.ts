import { useCallback, useEffect } from "react";
import { fabric } from "fabric";

type UseAutoResizeProps = {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
};

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.setWidth(width);
    canvas.setHeight(height);

    const center = canvas.getCenter();

    const zoomRatio = 0.85;

    const localWorkspace = canvas
      .getObjects()
      .find((obj) => obj.name === "clip");

    //@ts-ignore
    const scale = fabric.util.findScaleToFit(localWorkspace, {
      width,
      height,
    });

    const zoom = zoomRatio * scale;

    canvas.setViewportTransform(fabric.iMatrix.concat());
    canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

    if (!localWorkspace) return;

    const localWorkspaceCenter = localWorkspace.getCenterPoint();
    const viewPortTransform = canvas.viewportTransform;

    if (
      canvas.height === undefined ||
      canvas.width === undefined ||
      !viewPortTransform
    )
      return;

    viewPortTransform[4] =
      canvas.width / 2 - localWorkspaceCenter.x * viewPortTransform[0];
    viewPortTransform[5] =
      canvas.height / 2 - localWorkspaceCenter.y * viewPortTransform[3];

    canvas.setViewportTransform(viewPortTransform);

    localWorkspace.clone((cloned: fabric.Rect) => {
      canvas.clipPath = cloned;

      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, , container, autoZoom]);

  return { autoZoom };
};
