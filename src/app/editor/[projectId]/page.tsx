"use client";

import { Loader, TriangleAlert } from "lucide-react";

import { Editor } from "@/features/editor/components/editor";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EditorProjectIdPageProps = {
  params: {
    projectId: string;
  };
};

const EditorProjectIdPage = ({ params }: EditorProjectIdPageProps) => {
  const { projectId } = params;

  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-y-5">
        <TriangleAlert className="size-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Failed to Fetch project</p>
        <Button asChild variant="secondary">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return <Editor initialData={data} />;
};

export default EditorProjectIdPage;
