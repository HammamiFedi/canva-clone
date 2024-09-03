import { useState } from "react";

import { Editor, TextAlign, ToolbarProperties } from "@/features/editor/types";
import { isTextType } from "@/features/editor/utils";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_STYLE,
  DEFAULT_FONT_WEIGHT,
  FILL_COLOR,
  HEADING_FONT_WEIGHT,
  STROKE_COLOR,
} from "@/features/editor/constants";

type UseToolbarProps = {
  editor: Editor | undefined;
};

export const useToolbar = ({ editor }: UseToolbarProps) => {
  // Initial Values
  const initialFillColor = editor?.getActiveFillColor() || FILL_COLOR;
  const initialStrokeColor = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const initialFontStyle = editor?.getActiveFontStyle() || DEFAULT_FONT_STYLE;
  const initialIsTextLineThrough = editor?.getActiveTextLineThrough() || false;
  const initialIsTextUnderline = editor?.getActiveTextUnderline() || false;
  const initialFontSize = editor?.getActiveFontSize() || DEFAULT_FONT_SIZE;
  const initialTextAlign = editor?.getActiveTextAlign() || "left";
  const initialFontFamily =
    editor?.getActiveFontFamily() || DEFAULT_FONT_FAMILY;
  const initialFontWeight =
    editor?.getActiveFontWeight() || DEFAULT_FONT_WEIGHT;

  // Selected Object Type
  const selectedObjectType = editor?.selectedObjects[0]?.type;

  // Value to check if the selected object is a text
  const isText = isTextType(selectedObjectType);

  // Value to check if the selected object is an Image
  const isImage = selectedObjectType === "image";

  const [properties, setProperties] = useState<ToolbarProperties>({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
    isTextUnderline: initialIsTextUnderline,
    isTextLinethrough: initialIsTextLineThrough,
  });

  // Function to toggle text to bold
  const toggleBold = () => {
    const isBold = properties.fontWeight > 500;
    const newFontWeight = isBold ? DEFAULT_FONT_WEIGHT : HEADING_FONT_WEIGHT;

    editor?.changeFontWeight(newFontWeight);
    setProperties((current) => ({ ...current, fontWeight: newFontWeight }));
  };

  // Function to toggle text to italic
  const toggleItalic = () => {
    const isItalic = properties.fontStyle === "italic";
    const newFontStyle = isItalic ? DEFAULT_FONT_STYLE : "italic";

    editor?.changeFontStyle(newFontStyle);
    setProperties((current) => ({ ...current, fontStyle: newFontStyle }));
  };

  // Function to toggle text to linethrough
  const toggleLineThrough = () => {
    const newLineThrough = !properties.isTextLinethrough;

    editor?.changeTextLineThrough(newLineThrough);
    setProperties((current) => ({
      ...current,
      isTextLinethrough: newLineThrough,
    }));
  };

  // Function to toggle text to underline
  const toggleUnderline = () => {
    const newUnderline = !properties.isTextUnderline;

    editor?.changeTextUnderline(newUnderline);
    setProperties((current) => ({ ...current, isTextUnderline: newUnderline }));
  };

  // Function to change the text alignment
  const changeTextAlign = (value: TextAlign) => {
    editor?.changeTextAlign(value);
    setProperties((current) => ({ ...current, textAlign: value }));
  };

  // Function to change the font size
  const changeFontSize = (value: number) => {
    editor?.changeFontSize(value);
    setProperties((current) => ({ ...current, fontSize: value }));
  };

  return {
    properties,
    isText,
    isImage,
    toggleBold,
    toggleItalic,
    toggleLineThrough,
    toggleUnderline,
    changeTextAlign,
    changeFontSize,
  };
};
