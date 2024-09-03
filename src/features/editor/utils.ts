import type { RGBColor } from "react-color";
import { fabric } from "fabric";
import { uuid } from "uuidv4";

import { Filter } from "@/features/editor/types";
import { BLEND_COLOR } from "@/features/editor/constants";

export const isTextType = (type: string | undefined) => {
  return type === "text" || type === "i-text" || type === "textbox";
};

export const rgbaObjectToString = (rgba: RGBColor | "transparent"): string => {
  if (rgba === "transparent") return `rgba(0, 0, 0, 0)`;

  const alpha = rgba.a ?? 1;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};

export const createFilter = (value: Filter) => {
  let effect;

  switch (value) {
    case "saturation":
      effect = new fabric.Image.filters.Saturation({ saturation: 0.7 });
      break;
    case "grayscale":
      effect = new fabric.Image.filters.Grayscale();
      break;
    case "polaroid":
      // @ts-ignore
      effect = new fabric.Image.filters.Polaroid();
      break;
    case "sepia":
      effect = new fabric.Image.filters.Sepia();
      break;
    case "kodachrome":
      // @ts-ignore
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case "contrast":
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case "brightness":
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case "brownie":
      // @ts-ignore
      effect = new fabric.Image.filters.Brownie();
      break;
    case "vintage":
      // @ts-ignore
      effect = new fabric.Image.filters.Vintage();
      break;
    case "technicolor":
      // @ts-ignore
      effect = new fabric.Image.filters.Technicolor();
      break;
    case "technicolor":
      // @ts-ignore
      effect = new fabric.Image.filters.Technicolor();
      break;
    case "pixelate":
      effect = new fabric.Image.filters.Pixelate();
      break;
    case "invert":
      effect = new fabric.Image.filters.Invert();
      break;
    case "blur":
      effect = new fabric.Image.filters.Blur({
        blur: 0.1,
      });
      break;
    case "sharpen":
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case "emboss":
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case "removecolor":
      // @ts-ignore
      effect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case "blacknwhite":
      // @ts-ignore
      effect = new fabric.Image.filters.BlackWhite();
      break;
    case "vibrance":
      // @ts-ignore
      effect = new fabric.Image.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case "blendcolor":
      effect = new fabric.Image.filters.BlendColor({
        color: BLEND_COLOR,
        mode: "multiply",
      });
      break;
    case "huerotate":
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case "resize":
      effect = new fabric.Image.filters.Resize();
      break;
    case "gama":
      // @ts-ignore
      effect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
      return;
  }

  return effect;
};

export const downloadFile = (file: string, type: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.href = file;
  anchorElement.download = `${uuid()}.${type}`;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
};

export const transformText = (objects: fabric.Object[]) => {
  if (!objects) return;

  objects.forEach((item) => {
    // @ts-ignore
    if (item.objects) {
      // @ts-ignore
      transformText(item.objects);
    } else {
      item.type === "text" && (item.type = "textbox");
    }
  });
};
