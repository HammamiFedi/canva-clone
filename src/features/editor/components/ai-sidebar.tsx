import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

type AiSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  // Paywall
  const paywall = usePaywall();

  const [text, setText] = useState("");

  const mutation = useGenerateImage();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutateAsync({ prompt: text }).then(({ data }) => {
      editor?.addImage(data);
      setText("");
    });
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />
      <ScrollArea>
        <form className="space-y-6 p-4" onSubmit={onSubmit}>
          <Textarea
            placeholder="an astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={8}
            required
            minLength={3}
            value={text}
            disabled={mutation.isPending}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Generating..." : "Generate"}
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
