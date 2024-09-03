import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FontSizeInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export const FontSizeInput = ({ value, onChange }: FontSizeInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const foramttedValue = parseInt(e.target.value, 10);
    onChange(foramttedValue);
  };

  return (
    <div className="flex items-center">
      <Button
        className="rounded-r-none border-r-0 p-2"
        variant="outline"
        size="icon"
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        className="h-8 w-[50px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        type="number"
        min={1}
        onChange={handleChange}
      />
      <Button
        className="rounded-l-none border-l-0 p-2"
        variant="outline"
        size="icon"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
