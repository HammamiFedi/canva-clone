import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"],
  201
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["duplicate"]["$post"]
>["param"];

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.projects[":id"].duplicate.$post({
        param,
      });

      if (!response.ok) {
        throw new Error("Failed to duplicate project");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error("Failed to duplicate project");
    },
  });

  return mutation;
};
