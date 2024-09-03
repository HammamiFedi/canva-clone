import { useCallback, useMemo } from "react";
import { fabric } from "fabric";

import { Editor } from "@/features/editor/types";
import {
  createFilter,
  downloadFile,
  isTextType,
  transformText,
} from "@/features/editor/utils";
import { useClipboard } from "@/features/editor/hooks/use-clipboard";
import { useHotKeys } from "@/features/editor/hooks/use-hot-keys";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  DIAMOND_POINTS,
  INVERSE_TRIANGLE_POINTS,
  RECTANGLE_OPTIONS,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_FONT_STYLE,
  DEFAULT_FONT_SIZE,
  JSON_KEYS,
} from "@/features/editor/constants";

type UseBuildEditorProps = {
  canvas: fabric.Canvas | null;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];
  fontFamily: string;
  selectedObjects: fabric.Object[];
  setFillColor: (color: string) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setStrokeDashArray: (value: number[]) => void;
  setFontFamily: (fontFamily: string) => void;
  autoZoom: () => void;
  save: (skip?: boolean) => void;
  redo: () => void;
  undo: () => void;
  canRedo: () => boolean;
  canUndo: () => boolean;
};

export const useBuildEditor = ({
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
}: UseBuildEditorProps): { editor: Editor | undefined } => {
  // Hooks
  const { copy, paste } = useClipboard({ canvas });

  useHotKeys({
    canvas,
    redo,
    undo,
    save,
    copy,
    paste,
  });

  // Function to get the workspace
  const getWorkspace = useCallback(() => {
    if (canvas) {
      return canvas.getObjects().find((object) => object.name === "clip");
    }

    return undefined;
  }, [canvas]);

  // Function to center the fabric object in the workspace
  const centerObject = useCallback(
    (object: fabric.Object) => {
      const workspace = getWorkspace();
      const workspaceCenter = workspace?.getCenterPoint();

      if (!workspaceCenter || !canvas) return;

      // @ts-ignore
      canvas._centerObject(object, workspaceCenter);
    },
    [canvas, getWorkspace],
  );

  // Function to add the object to the canvas
  const addToCanvas = useCallback(
    (object: fabric.Object) => {
      if (!canvas) return;

      centerObject(object);
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    [canvas, centerObject],
  );

  // Function to generate the save options
  const generateSaveOptions = () => {
    const { width, height, left, top } = getWorkspace() as fabric.Rect;

    return {
      name: "Image",
      format: "png",
      quality: 1,
      width,
      height,
      left,
      top,
    };
  };

  const saveAsPng = () => {
    const options = generateSaveOptions();
    if (canvas) {
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "png");
      autoZoom();
    }
  };

  const saveAsSvg = () => {
    const options = generateSaveOptions();
    if (canvas) {
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "svg");
      autoZoom();
    }
  };

  const saveAsJpg = () => {
    const options = generateSaveOptions();
    if (canvas) {
      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      const dataUrl = canvas.toDataURL(options);
      downloadFile(dataUrl, "jpg");
      autoZoom();
    }
  };

  const saveAsJson = async () => {
    if (canvas) {
      const dataUrl = canvas.toJSON(JSON_KEYS);

      await transformText(dataUrl.objects);

      const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataUrl, null, "\t"),
      )}`;

      downloadFile(fileString, "json");
    }
  };

  const loadFromJson = (json: string) => {
    const data = JSON.parse(json);

    if (canvas) {
      canvas.loadFromJSON(data, () => {
        autoZoom();
      });
    }
  };

  // Function to build the editor
  const buildEditor = useCallback(
    (canvas: fabric.Canvas): Editor => {
      return {
        canvas,
        selectedObjects,
        getWorkspace,
        autoZoom,
        redo,
        undo,
        canRedo,
        canUndo,
        saveAsPng,
        saveAsSvg,
        saveAsJpg,
        saveAsJson,
        loadFromJson,

        delete: () => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              canvas.remove(object);
            });
            canvas.discardActiveObject();
            canvas.renderAll();
          }
        },

        addCircle: () => {
          const circleObject = new fabric.Circle({
            ...CIRCLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
          });

          addToCanvas(circleObject);
        },

        addSoftRectangle: () => {
          const softRectangleObject = new fabric.Rect({
            ...RECTANGLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
            rx: 30,
            ry: 30,
          });

          addToCanvas(softRectangleObject);
        },

        addRectangle: () => {
          const rectangleObject = new fabric.Rect({
            ...RECTANGLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
          });

          addToCanvas(rectangleObject);
        },

        addTriangle: () => {
          const triangleObject = new fabric.Triangle({
            ...TRIANGLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
          });

          addToCanvas(triangleObject);
        },

        addInverseTriangle: () => {
          const triangleObject = new fabric.Polygon(INVERSE_TRIANGLE_POINTS, {
            ...TRIANGLE_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
          });

          addToCanvas(triangleObject);
        },

        addDiamond: () => {
          const diamondObject = new fabric.Polygon(DIAMOND_POINTS, {
            ...DIAMOND_OPTIONS,
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth,
            strokeDashArray,
          });

          addToCanvas(diamondObject);
        },

        addText: (value, options) => {
          const textObject = new fabric.Textbox(
            value,
            options
              ? { ...options, fill: fillColor }
              : {
                  ...TEXT_OPTIONS,
                  fill: fillColor,
                },
          );

          addToCanvas(textObject);
        },

        addImage: (url) => {
          fabric.Image.fromURL(
            url,
            (image) => {
              const workspace = getWorkspace();

              image.scaleToWidth(workspace?.width || 0);
              image.scaleToHeight(workspace?.height || 0);

              addToCanvas(image);
            },
            {
              crossOrigin: "anonymous",
            },
          );
        },

        changeFillColor: (newColor) => {
          if (canvas) {
            setFillColor(newColor);
            canvas.getActiveObjects().forEach((object) => {
              object.set({ fill: newColor });
            });
            canvas.renderAll();
          }
        },

        changeStrokeColor: (newColor) => {
          if (canvas) {
            setStrokeColor(newColor);
            canvas.getActiveObjects().forEach((object) => {
              // Text types don't have a stroke
              if (isTextType(object.type)) {
                object.set({ fill: newColor });
              }

              object.set({ stroke: newColor });
            });
            canvas.freeDrawingBrush.color = newColor;
            canvas.renderAll();
          }
        },

        changeStrokeWidth: (newWidth) => {
          if (canvas) {
            setStrokeWidth(newWidth);
            canvas.getActiveObjects().forEach((object) => {
              object.set({ strokeWidth: newWidth });
            });
          }
          canvas.freeDrawingBrush.width = newWidth;
          canvas.renderAll();
        },

        changeStrokeDashArray: (value) => {
          setStrokeDashArray(value);

          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              object.set({ strokeDashArray: value });
            });
            canvas.renderAll();
          }
        },

        changeOpacity: (value) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              object.set({ opacity: value });
            });
            canvas.renderAll();
          }
        },

        changeFontFamily: (fontFamily) => {
          setFontFamily(fontFamily);

          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                object.set({ fontFamily });
              }
            });
            canvas.renderAll();
          }
        },

        changeFontWeight: (fontWeight) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                object.set({ fontWeight });
              }

              canvas.renderAll();
            });
          }
        },

        changeFontStyle: (fontStyle) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                // Faulty TS library, fontStyle exisits
                object.set({ fontStyle });
              }
              canvas.renderAll();
            });
          }
        },

        changeTextLineThrough: (value) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                // Faulty TS library, linethrough exisits
                object.set({ linethrough: value });
              }
            });
            canvas.renderAll();
          }
        },

        changeTextUnderline: (value) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                // Faulty TS library, underline exisits
                object.set({ underline: value });
              }
            });
            canvas.renderAll();
          }
        },

        changeTextAlign: (value) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                // Faulty TS library, textAlign exisits
                object.set({ textAlign: value });
              }
            });
            canvas.renderAll();
          }
        },

        changeFontSize: (value) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (isTextType(object.type)) {
                // @ts-ignore
                // Faulty TS library, fontSize exisits
                object.set({ fontSize: value });
              }
            });
            canvas.renderAll();
          }
        },

        changeImageFilter: (filter) => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              if (object.type === "image") {
                const imageObject = object as fabric.Image;

                // Create the effect
                const effect = createFilter(filter);

                imageObject.filters = effect ? [effect] : [];

                imageObject.applyFilters();
                canvas.renderAll();
              }
            });
          }
        },

        changeWorkspaceSize: (size) => {
          const worksapce = getWorkspace();

          if (worksapce) {
            worksapce.set(size);
            autoZoom();

            save();
          }
        },

        changeWorkspaceBackground: (color) => {
          const workspace = getWorkspace();

          if (workspace) {
            workspace.set({ fill: color });
            canvas?.renderAll();

            save();
          }
        },

        getActiveFillColor: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return fillColor;
          }

          const value = selectedObject.get("fill") || fillColor;

          // Currently, gradients & patterns are not supported
          return value as string;
        },

        getActiveStrokeColor: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return strokeColor;
          }

          const value = selectedObject.get("stroke") || strokeColor;

          return value;
        },

        getActiveStrokeWidth: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return strokeWidth;
          }

          const value = selectedObject.get("strokeWidth") || strokeWidth;

          return value;
        },

        getActiveStrokeDashArray: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return strokeDashArray;
          }

          const value =
            selectedObject.get("strokeDashArray") || strokeDashArray;

          return value;
        },

        getActiveOpacity: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return 1;
          }

          const value = selectedObject.get("opacity") || 1;

          return value;
        },

        getActiveFontFamily: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return fontFamily;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, fontFamily exisits
            return selectedObject.get("fontFamily") || fontFamily;
          }

          return fontFamily;
        },

        getActiveFontWeight: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return DEFAULT_FONT_WEIGHT;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, fontWeight exisits
            return selectedObject.get("fontWeight") || DEFAULT_FONT_WEIGHT;
          }

          return DEFAULT_FONT_WEIGHT;
        },

        getActiveFontStyle: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return DEFAULT_FONT_STYLE;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, fontStyle exisits
            return selectedObject.get("fontStyle") || DEFAULT_FONT_STYLE;
          }

          return DEFAULT_FONT_STYLE;
        },

        getActiveTextLineThrough: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return false;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, linethrough exisits
            return selectedObject.get("linethrough") || false;
          }

          return false;
        },

        getActiveTextUnderline: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return false;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, underline exisits
            return selectedObject.get("underline") || false;
          }

          return false;
        },

        getActiveTextAlign: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return "left";
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, textAlign exisits
            return selectedObject.get("textAlign") || "left";
          }

          return "left";
        },

        getActiveFontSize: () => {
          const selectedObject = selectedObjects[0];

          if (!selectedObject) {
            return DEFAULT_FONT_SIZE;
          }

          if (isTextType(selectedObject.type)) {
            // @ts-ignore
            // Faulty TS library, fontSize exisits
            return selectedObject.get("fontSize") || DEFAULT_FONT_SIZE;
          }

          return DEFAULT_FONT_SIZE;
        },

        bringForward: () => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              canvas.bringForward(object);
            });
            canvas.renderAll();

            const workspace = getWorkspace();

            if (workspace) {
              workspace.sendToBack();
            }
          }
        },

        sendBackwards: () => {
          if (canvas) {
            canvas.getActiveObjects().forEach((object) => {
              canvas.sendBackwards(object);
            });
            canvas.renderAll();

            const workspace = getWorkspace();

            if (workspace) {
              workspace.sendToBack();
            }
          }
        },

        onDuplicate: () => {
          copy();
          paste();
        },

        enableDrawingMode: () => {
          canvas.discardActiveObject();
          canvas.renderAll();
          canvas.isDrawingMode = true;
          canvas.freeDrawingBrush.width = strokeWidth;
          canvas.freeDrawingBrush.color = strokeColor;
        },

        disableDrawingMode: () => {
          canvas.isDrawingMode = false;
        },

        zoomIn: () => {
          let zoomRatio = canvas.getZoom();
          zoomRatio += 0.05;
          const center = canvas.getCenter();
          canvas.zoomToPoint(
            new fabric.Point(center.left, center.top),
            zoomRatio > 1 ? 1 : zoomRatio,
          );
        },

        zoomOut: () => {
          let zoomRatio = canvas.getZoom();
          zoomRatio -= 0.05;
          const center = canvas.getCenter();
          canvas.zoomToPoint(
            new fabric.Point(center.left, center.top),
            zoomRatio < 0.2 ? 0.2 : zoomRatio,
          );
        },
      };
    },
    [
      canvas,
      strokeColor,
      strokeWidth,
      fillColor,
      selectedObjects,
      strokeDashArray,
      fontFamily,
      addToCanvas,
      getWorkspace,
      copy,
      paste,
      autoZoom,
      save,
      redo,
      undo,
      canRedo,
      canUndo,
    ],
  );

  // Editor contains all the functions to manipulate the canvas
  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor(canvas);
    }

    return undefined;
  }, [canvas, buildEditor]);

  return { editor };
};
