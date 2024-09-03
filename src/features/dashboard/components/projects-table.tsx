import React from "react";
import { useRouter } from "next/navigation";
import { FileIcon, MoreHorizontal, CopyIcon, TrashIcon } from "lucide-react";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useDuplicateProject } from "@/features/projects/api/use-duplicate-project";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ResponseType } from "@/features/projects/api/use-get-projects";

type ProjectsTableProps = {
  pages: ResponseType[];
};

export const ProjectsTable = ({ pages }: ProjectsTableProps) => {
  const router = useRouter();

  // Mutations
  const { mutate: remove, isPending: isDeleting } = useDeleteProject();
  const { mutate: duplicate, isPending: isDuplicating } = useDuplicateProject();

  // Confirmation hook
  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Are you sure?",
    message: "You are about to delete this project.",
  });

  const onDuplicateProject = (id: string) => {
    duplicate({ id });
  };

  const onDeleteProject = async (id: string) => {
    const userHasConfirmed = await confirm();

    if (userHasConfirmed) {
      // api call to delete project
      remove({ id });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableCell className="font-semibold">Project name</TableCell>
          <TableCell className="hidden font-semibold md:table-cell">
            Dimensions
          </TableCell>
          <TableCell className="hidden font-semibold md:table-cell">
            Last edited
          </TableCell>
          <TableCell className="flex items-center justify-end font-semibold">
            Actions
          </TableCell>
        </TableHeader>
        <TableBody>
          {pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.data.map((project) => (
                <TableRow key={project.id}>
                  <TableCell
                    className="flex cursor-pointer items-center gap-x-2 font-medium"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    <FileIcon className="size-6" />
                    {project.name}
                  </TableCell>
                  <TableCell
                    className="hidden cursor-pointer md:table-cell"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    {project.width} x {project.height} px
                  </TableCell>
                  <TableCell
                    className="hidden cursor-pointer md:table-cell"
                    onClick={() => router.push(`editor/${project.id}`)}
                  >
                    {formatDistanceToNow(project.updatedAt, {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="flex items-center justify-end">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={false}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-60">
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={isDuplicating}
                          onClick={() => onDuplicateProject(project.id)}
                        >
                          <CopyIcon className="mr-2 size-4 text-sky-500" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-10 cursor-pointer"
                          disabled={isDeleting}
                          onClick={() => onDeleteProject(project.id)}
                        >
                          <TrashIcon className="mr-2 size-4 text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <ConfirmationDialog />
    </>
  );
};
