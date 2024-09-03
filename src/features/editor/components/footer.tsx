import { Minimize, ZoomIn, ZoomOut } from "lucide-react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/types";

type FooterProps = {
  editor: Editor | undefined;
};

export const Footer = ({ editor }: FooterProps) => {
  return (
    <footer className="z-[49] flex h-[52px] w-full shrink-0 flex-row-reverse items-center gap-x-1 overflow-x-auto border-t bg-white p-2 px-4">
      <Hint label="Reset" side="top" sideOffset={10}>
        <Button
          className="h-full"
          variant="ghost"
          size="icon"
          onClick={() => editor?.autoZoom()}
        >
          <Minimize className="size-4" />
        </Button>
      </Hint>

      <Hint label="Zoom in" side="top" sideOffset={10}>
        <Button
          className="h-full"
          variant="ghost"
          size="icon"
          onClick={() => editor?.zoomIn()}
        >
          <ZoomIn className="size-4" />
        </Button>
      </Hint>

      <Hint label="Zoom out" side="top" sideOffset={10}>
        <Button
          className="h-full"
          variant="ghost"
          size="icon"
          onClick={() => editor?.zoomOut()}
        >
          <ZoomOut className="size-4" />
        </Button>
      </Hint>
    </footer>
  );
};
