import { useState, useRef } from "react";
import { toast } from "sonner";
import { useClickAway, useKeyPressEvent } from "react-use";

import { Hint } from "@/components/hint";
import { Input } from "@/components/ui/input";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

type ProjectNameInputProps = {
  projectId: string;
  projectName: string;
};

export const ProjectNameInput = ({
  projectId,
  projectName,
}: ProjectNameInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(projectName);

  // Mutation
  const { mutate, isPending } = useUpdateProject(projectId);

  useClickAway(inputRef, () => {
    // If isPending, The user cannot cancel the editing
    if (isPending) return;

    setIsEditing(false);
    setName(projectName);
  });

  useKeyPressEvent("Enter", () => {
    // If isPending, The user cannot submit multiple times
    if (isPending) return;

    // Call the mutation
    mutate(
      { name },
      {
        // Handle the success state
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Project name updated successfully");
        },
        onError: () => {
          // Handle the error state
          setIsEditing(false);
          setName(projectName);
          toast.error("Failed to update project name");
        },
      },
    );
  });

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        className="w-40"
        type="text"
        value={name}
        autoFocus={isEditing}
        disabled={isPending}
        onChange={(e) => setName(e.target.value)}
      />
    );
  }

  return (
    <Hint label="Double click to change the name">
      <h1
        className="cursor-pointer text-sm font-semibold"
        onDoubleClick={() => setIsEditing(true)}
      >
        {name}
      </h1>
    </Hint>
  );
};
