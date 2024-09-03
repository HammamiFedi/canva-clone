import { fabric } from "fabric";
import { ITextboxOptions } from "fabric/fabric-impl";

export type ActiveTool =
  | "select"
  | "text"
  | "shapes"
  | "images"
  | "draw"
  | "fill"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "settings"
  | "ai"
  | "remove-bg"
  | "templates";

export type TextAlign = "left" | "center" | "right";

export type Filter =
  | "saturation"
  | "grayscale"
  | "polaroid"
  | "sepia"
  | "kodachrome"
  | "contrast"
  | "brightness"
  | "brownie"
  | "vintage"
  | "technicolor"
  | "pixelate"
  | "invert"
  | "blur"
  | "sharpen"
  | "emboss"
  | "removecolor"
  | "blacknwhite"
  | "vibrance"
  | "blendcolor"
  | "huerotate"
  | "resize"
  | "gama"
  | "none";

export type ToolbarProperties = {
  fillColor: string;
  strokeColor: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: "italic" | "normal";
  textAlign: TextAlign;
  fontSize: number;
  isTextUnderline: boolean;
  isTextLinethrough: boolean;
};

export type Editor = {
  canvas: fabric.Canvas;
  selectedObjects: fabric.Object[];
  delete: () => void;
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;
  addText: (value: string, options?: ITextboxOptions) => void;
  addImage: (url: string) => void;
  changeFillColor: (color: string) => void;
  changeStrokeColor: (color: string) => void;
  changeStrokeWidth: (width: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeOpacity: (value: number) => void;
  changeFontFamily: (fontFamily: string) => void;
  changeFontWeight: (fontWeight: number) => void;
  changeFontStyle: (fontStyle: "italic" | "normal") => void;
  changeTextLineThrough: (value: boolean) => void;
  changeTextUnderline: (value: boolean) => void;
  changeTextAlign: (value: TextAlign) => void;
  changeFontSize: (value: number) => void;
  changeImageFilter: (filter: Filter) => void;
  changeWorkspaceSize: (size: { width: number; height: number }) => void;
  changeWorkspaceBackground: (color: string) => void;
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;
  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => "italic" | "normal";
  getActiveTextLineThrough: () => boolean;
  getActiveTextUnderline: () => boolean;
  getActiveTextAlign: () => TextAlign;
  getActiveFontSize: () => number;
  getWorkspace: () => fabric.Object | undefined;
  bringForward: () => void;
  sendBackwards: () => void;
  onDuplicate: () => void;
  enableDrawingMode: () => void;
  disableDrawingMode: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  autoZoom: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveAsPng: () => void;
  saveAsSvg: () => void;
  saveAsJpg: () => void;
  saveAsJson: () => Promise<void>;
  loadFromJson: (json: string) => void;
};
