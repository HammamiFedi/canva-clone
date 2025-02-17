"use client";

import { useMutationState } from "@tanstack/react-query";
import { useFilePicker } from "use-file-picker";
import {
  ChevronDown,
  Download,
  Loader,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { Logo } from "@/features/editor/components/logo";
import { ProjectNameInput } from "@/features/editor/components/project-name-input";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { UserButton } from "@/features/auth/components/user-button";

type NavbarProps = {
  id: string;
  projectName: string;
  activeTool: ActiveTool;
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

export const Navbar = ({
  id,
  projectName,
  activeTool,
  editor,
  onChangeActiveTool,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: { plainFiles: File[] }) => {
      if (plainFiles && plainFiles.length) {
        const file = plainFiles[0];
        const reader = new FileReader();

        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadFromJson(reader.result as string);
        };
      }
    },
  });
  return (
    <nav className="flex h-[68px] w-full items-center gap-x-8 border-b p-4 lg:pl-[34px]">
      <Logo />
      <div className="flex h-full w-full items-center gap-x-1">
        <ProjectNameInput projectId={id} projectName={projectName} />
        <Separator orientation="vertical" className="mx-2" />
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
              File <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => openFilePicker()}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON File
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select">
          <Button
            variant="ghost"
            size="icon"
            className={cn(activeTool === "select" && "bg-gray-100")}
            onClick={() => onChangeActiveTool("select")}
          >
            <MousePointerClick className="size-4" />
          </Button>
        </Hint>
        <Hint label="Undo">
          <Button
            className=""
            variant="ghost"
            size="icon"
            disabled={!editor?.canUndo()}
            onClick={() => editor?.undo()}
          >
            <Undo2 className="size-4" />
          </Button>
        </Hint>
        <Hint label="Redo">
          <Button
            className=""
            variant="ghost"
            size="icon"
            disabled={!editor?.canRedo()}
            onClick={() => editor?.redo()}
          >
            <Redo2 className="size-4" />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        {/* Saved, Saving and error */}
        {isPending && (
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Saving...</div>
          </div>
        )}
        {!isPending && isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Failed to save</div>
          </div>
        )}
        {!isPending && !isError && (
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        )}
        <div className="ml-auto flex items-center gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export <Download className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveAsJson()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveAsPng()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveAsJpg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveAsSvg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
