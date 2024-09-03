import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.users)["signup"]["$post"]
>;

type RequestType = InferRequestType<
  (typeof client.api.users)["signup"]["$post"]
>["json"];

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.signup.$post({ json });

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          throw new Error(data.error);
        } else {
          throw new Error("Something went wrong");
        }
      }

      return await response.json();
    },
  });

  return mutation;
};
