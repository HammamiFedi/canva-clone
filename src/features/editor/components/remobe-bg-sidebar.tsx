import Image from "next/image";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ActiveTool, Editor } from "@/features/editor/types";
import { ImageError } from "@/features/images/components/image-error";
import { Button } from "@/components/ui/button";
import { useRemoveBackground } from "@/features/ai/api/use-remove-background";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

type RemoveBgSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  // Paywall
  const paywall = usePaywall();

  const selectedObject = editor?.selectedObjects[0];

  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const mutation = useRemoveBackground();

  const onClick = () => {
    if (paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    mutation.mutate(
      {
        image: imageSrc,
      },
      {
        onSuccess: ({ data }) => {
          editor?.addImage(data);
        },
      },
    );
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Background removal"
        description="Remove background from image using AI"
      />
      {!imageSrc ? (
        <ImageError errorDescription="Feature not available for this object" />
      ) : (
        <ScrollArea>
          <div className="space-y-4 p-4">
            <div
              className={cn(
                "relative aspect-square overflow-hidden rounded-md bg-muted p-4 transition",
                mutation.isPending && "opacity-50",
              )}
            >
              <Image src={imageSrc} fill alt="Image" className="object-cover" />
            </div>
            <Button
              className="w-full"
              onClick={onClick}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Removing..." : "Remove background"}
            </Button>
          </div>
        </ScrollArea>
      )}
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
