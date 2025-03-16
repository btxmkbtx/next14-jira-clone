import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkSpaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const respose = await client.api.workspaces.$get();
      if (!respose.ok) {
        throw new Error("Failed to fetch workspaces");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
