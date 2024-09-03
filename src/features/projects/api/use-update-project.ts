import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["project", { id }],
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"].$patch({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      return await response.json();
    },
    onSuccess: () => {
      // Invalidate the "project" query with the updated project ID
      queryClient.invalidateQueries({
        queryKey: ["project", { id }],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
