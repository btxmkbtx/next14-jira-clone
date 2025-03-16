import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current"],
    queryFn: async () => {
      const respose = await client.api.auth.current.$get();
      if (!respose.ok) {
        return null;
      }

      const { data } = await respose.json();

      return data;
    },
  });

  return query;
};
