import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DEFAULT_FONT_FAMILY, FONTS } from "@/features/editor/constants";

type FontSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const currentFontFamily =
    editor?.getActiveFontFamily() || DEFAULT_FONT_FAMILY;

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Font options"
        description="Change the text font"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          {FONTS.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "h-16 w-full justify-start px-4 py-2 text-left text-base",
                currentFontFamily === font
                  ? "border-2 border-blue-500"
                  : "hover:border hover:border-blue-500",
              )}
              style={{
                fontFamily: font,
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
