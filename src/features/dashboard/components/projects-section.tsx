"use client";

import { Button } from "@/components/ui/button";
import { SectionLoader } from "@/features/dashboard/components/section-loader";
import { SectionNoDataFound } from "@/features/dashboard/components/section-no-data-found";
import { SectionError } from "@/features/dashboard/components/section-error";
import { ProjectsTable } from "@/features/dashboard/components/projects-table";
import { useGetProjects } from "@/features/projects/api/use-get-projects";

export const ProjectsSection = () => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetProjects();

  if (status === "error")
    return (
      <SectionError
        title="Recent projects"
        message="Failed to load projects."
      />
    );

  if (status === "pending") return <SectionLoader title="Recent projects" />;

  if (!data.pages[0].data.length)
    return (
      <SectionNoDataFound
        title="Recent projects"
        message="No projects found."
      />
    );

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Recent projects</h1>
      <ProjectsTable pages={data.pages} />
      {hasNextPage && (
        <div className="flex w-full items-center justify-center pt-4">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};
