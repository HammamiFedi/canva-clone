import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_TEXT,
  DEFAULT_HEADING_TEXT,
  DEFAULT_SUB_HEADING_TEXT,
  DEFAULT_PARAGRAPH_TEXT,
  TEXT_HEADING_OPTIONS,
  TEXT_SUB_HEADING_OPTIONS,
  TEXT_PARAGRAPH_OPTIONS,
} from "@/features/editor/constants";

type TextSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const TextSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TextSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "text" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Text options"
        description="Add text to your canvas"
      />
      <ScrollArea>
        <div className="space-y-4 border-b p-4">
          <Button
            className="w-full"
            onClick={() => editor?.addText(DEFAULT_TEXT)}
          >
            Add a Textbox
          </Button>
          <Button
            className="h-16 w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText(DEFAULT_HEADING_TEXT, TEXT_HEADING_OPTIONS)
            }
          >
            <span className="text-3xl font-bold">Add a Heading</span>
          </Button>
          <Button
            className="h-16 w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText(
                DEFAULT_SUB_HEADING_TEXT,
                TEXT_SUB_HEADING_OPTIONS,
              )
            }
          >
            <span className="text-xl font-semibold">Add a Sub Heading</span>
          </Button>
          <Button
            className="h-16 w-full"
            variant="secondary"
            size="lg"
            onClick={() =>
              editor?.addText(DEFAULT_PARAGRAPH_TEXT, TEXT_PARAGRAPH_OPTIONS)
            }
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
