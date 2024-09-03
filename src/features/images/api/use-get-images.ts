import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetImages = () => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await client.api.images.$get();

      // Check if the response is an error
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
