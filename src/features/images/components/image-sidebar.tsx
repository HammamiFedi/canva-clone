import { useCallback } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
import { ImageLoader } from "@/features/images/components/image-loader";
import { ImageError } from "@/features/images/components/image-error";
import { ImageCard } from "@/features/images/components/image-card";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { UploadButton } from "@/lib/uploadthing";
import { useGetImages } from "@/features/images/api/use-get-images";

type ImageSidebarProps = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const ImageSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onImageClick = useCallback(
    (src: string) => {
      editor?.addImage(src);
    },
    [editor],
  );

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "images" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Images"
        description="Add images to your canvas"
      />
      <div className="border-b p-4">
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            button: "w-full text-sm font-medium",
          }}
          content={{
            button: "Upload Image",
          }}
          onClientUploadComplete={(res) => {
            editor?.addImage(res[0].url);
          }}
        />
      </div>
      {isLoading && <ImageLoader />}

      {isError && <ImageError errorDescription="Failed to fetch images" />}

      <ScrollArea>
        <div className="grid grid-cols-2 gap-4 p-4">
          {data &&
            data.map((image) => (
              <ImageCard
                key={image.id}
                imageSrc={image.urls.small}
                altDescription={image.alt_description || "Image"}
                hrefTarget={image.links.html}
                userName={image.user.name}
                onClick={() => onImageClick(image.urls.regular)}
              />
            ))}
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
