import {
  ICircleOptions,
  IRectOptions,
  ITextboxOptions,
  ITriangleOptions,
} from "fabric/fabric-impl";
import * as material from "material-colors";

import { Filter } from "@/features/editor/types";

export const FILL_COLOR = "rgba(0,0,0,1)";
export const STROKE_COLOR = "rgba(0,0,0,1)";
export const BLEND_COLOR = "#00ff00";
export const STROKE_WIDTH = 2;
export const WIDTH = 400;
export const HEIGHT = 400;
export const DIAMOND_WIDTH = 600;
export const DIAMOND_HEIGHT = 600;
export const CIRCLE_RADIUS = 250;
export const STROKE_DASH_ARRAY = [];

export const DEFAULT_FONT_FAMILY = "Arial";
export const DEFAULT_FONT_SIZE = 28;
export const DEFAULT_FONT_WEIGHT = 400;
export const HEADING_FONT_SIZE = 80;
export const DEFAULT_FONT_STYLE = "normal";
export const SUB_HEADING_FONT_SIZE = 48;
export const PARAGRAPH_FONT_SIZE = 32;
export const HEADING_FONT_WEIGHT = 700;
export const SUB_HEADING_FONT_WEIGHT = 600;
export const PARAGRAPH_FONT_WEIGHT = 500;
export const DEFAULT_TEXT = "Hello 🖐️";
export const DEFAULT_HEADING_TEXT = "Heading";
export const DEFAULT_SUB_HEADING_TEXT = "Subheading";
export const DEFAULT_PARAGRAPH_TEXT = "Paragraph";

export const SELECTION_DEPENDANT_TOOLS = [
  "fill",
  "font",
  "filter",
  "opacity",
  "remove-bg",
  "stroke-color",
  "stroke-width",
];

export const COLORS = [
  material.red["500"],
  material.pink["500"],
  material.purple["500"],
  material.deepPurple["500"],
  material.indigo["500"],
  material.blue["500"],
  material.lightBlue["500"],
  material.cyan["500"],
  material.teal["500"],
  material.green["500"],
  material.lightGreen["500"],
  material.lime["500"],
  material.yellow["500"],
  material.amber["500"],
  material.orange["500"],
  material.deepOrange["500"],
  material.brown["500"],
  material.blueGrey["500"],
  "transparent",
];

export const FONTS = [
  "Arial",
  "Arial Black",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
  "Palatino",
  "Bookman",
  "Comic Sans MS",
  "Impact",
  "Lucida Sans Unicode",
  "Geneva",
  "Lucida Console",
];

export const FILTERS: Filter[] = [
  "none",
  "saturation",
  "grayscale",
  "polaroid",
  "sepia",
  "kodachrome",
  "contrast",
  "brightness",
  "brownie",
  "vintage",
  "technicolor",
  "pixelate",
  "invert",
  "blur",
  "sharpen",
  "emboss",
  "removecolor",
  "blacknwhite",
  "vibrance",
  "blendcolor",
  "huerotate",
  "resize",
  "gama",
];

export const JSON_KEYS = [
  "name",
  "gradientAngle",
  "selectable",
  "hasControls",
  "linkData",
  "editable",
  "extensionType",
  "extension",
];

export const CIRCLE_OPTIONS: ICircleOptions = {
  radius: CIRCLE_RADIUS,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
};

export const RECTANGLE_OPTIONS: IRectOptions = {
  height: HEIGHT,
  width: WIDTH,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const TRIANGLE_OPTIONS: ITriangleOptions = {
  width: HEIGHT,
  height: WIDTH,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const DIAMOND_OPTIONS: IRectOptions = {
  height: DIAMOND_HEIGHT,
  width: DIAMOND_WIDTH,
  fill: FILL_COLOR,
  stroke: STROKE_COLOR,
  strokeWidth: STROKE_WIDTH,
  angle: 0,
};

export const INVERSE_TRIANGLE_POINTS: Array<{
  x: number;
  y: number;
}> = [
  { x: 0, y: 0 },
  { x: WIDTH, y: 0 },
  { x: WIDTH / 2, y: HEIGHT },
];

export const DIAMOND_POINTS: Array<{
  x: number;
  y: number;
}> = [
  { x: DIAMOND_WIDTH / 2, y: 0 },
  { x: DIAMOND_WIDTH, y: DIAMOND_HEIGHT / 2 },
  { x: DIAMOND_WIDTH / 2, y: DIAMOND_HEIGHT },
  { x: 0, y: DIAMOND_HEIGHT / 2 },
];

export const TEXT_OPTIONS: ITextboxOptions = {
  type: "textbox",
  fill: FILL_COLOR,
  fontSize: DEFAULT_FONT_SIZE,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontWeight: DEFAULT_FONT_WEIGHT,
};

export const TEXT_HEADING_OPTIONS: ITextboxOptions = {
  fill: FILL_COLOR,
  fontSize: HEADING_FONT_SIZE,
  fontWeight: HEADING_FONT_WEIGHT,
  fontFamily: DEFAULT_FONT_FAMILY,
};

export const TEXT_SUB_HEADING_OPTIONS: ITextboxOptions = {
  fill: FILL_COLOR,
  fontSize: SUB_HEADING_FONT_SIZE,
  fontWeight: SUB_HEADING_FONT_WEIGHT,
  fontFamily: DEFAULT_FONT_FAMILY,
};

export const TEXT_PARAGRAPH_OPTIONS: ITextboxOptions = {
  fill: FILL_COLOR,
  fontSize: PARAGRAPH_FONT_SIZE,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontWeight: PARAGRAPH_FONT_WEIGHT,
};
