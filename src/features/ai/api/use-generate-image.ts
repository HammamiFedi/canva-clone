import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["generate-image"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.ai)["generate-image"]["$post"]
>["json"];

export const useGenerateImage = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.ai["generate-image"].$post({ json });

      return await response.json();
    },
    onError: (error) => {
      toast.error("Only premium users can generate images using AI.");
    },
  });

  return mutation;
};
