import { ChromePicker, CirclePicker } from "react-color";

import { COLORS } from "@/features/editor/constants";
import { rgbaObjectToString } from "@/features/editor/utils";

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        className="rounded-lg border"
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
      <CirclePicker
        colors={COLORS}
        color={value}
        onChangeComplete={(color) => {
          const formattedValue = rgbaObjectToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};
