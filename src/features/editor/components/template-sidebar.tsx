import Image from "next/image";
import { Crown } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ImageLoader } from "@/features/images/components/image-loader";
import { ImageError } from "@/features/images/components/image-error";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import {
  ResponseType,
  useGetTemplates,
} from "@/features/projects/api/use-get-templates";
import { useConfirm } from "@/hooks/use-confirm";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

type TemplateSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const TemplateSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: TemplateSidebarProps) => {
  // Mutation
  const { data, isLoading, isError } = useGetTemplates({
    limit: "20",
    page: "1",
  });

  // Paywall
  const paywall = usePaywall();

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to replace the current design with this template",
    type: "neutral",
  });

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onTemplateClick = async (template: ResponseType["data"][0]) => {
    if (template.isPro && paywall.shouldBlock) {
      paywall.triggerPaywall();
      return;
    }

    const userHasConfirmed = await confirm();

    if (userHasConfirmed) {
      editor?.loadFromJson(template.json);
    }
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "templates" ? "visible" : "hidden",
      )}
    >
      <ConfirmationDialog />
      <ToolSidebarHeader
        title="Templates"
        description="Choose from a variety of templates to get started"
      />

      {isLoading && <ImageLoader />}

      {isError && <ImageError errorDescription="Failed to fetch templates" />}

      <ScrollArea>
        <div className="grid grid-cols-2 gap-4 p-4">
          {data &&
            data.map((template) => (
              <button
                key={template.id}
                className="group relative w-full cursor-pointer overflow-hidden rounded-sm border bg-muted transition hover:opacity-75"
                style={{
                  aspectRatio: `${template.width}/${template.height}`,
                }}
                onClick={() => onTemplateClick(template)}
              >
                <Image
                  fill
                  loading="lazy"
                  src={template.thumbnailUrl || ""}
                  alt={template.name || "Template"}
                  className="object-cover"
                />
                {template.isPro && (
                  <div className="absolute right-2 top-2 z-[10] flex size-8 items-center justify-center rounded-full bg-black/50">
                    <Crown className="size-5 fill-yellow-500 text-yellow-500" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full truncate bg-black/50 p-1 text-left text-[10px] text-white opacity-0 group-hover:opacity-100">
                  {template.name}
                </div>
              </button>
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
