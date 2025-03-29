import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId], //reload by workspaceId
    queryFn: async () => {
      const respose = await client.api.projects.$get({
        query: { workspaceId },
      });
      if (!respose.ok) {
        throw new Error("Failed to fetch projects");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
