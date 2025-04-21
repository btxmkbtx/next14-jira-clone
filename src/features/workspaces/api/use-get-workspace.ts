import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId], //reload by workspaceId
    queryFn: async () => {
      const respose = await client.api.workspaces[":workspaceId"].$get({
        param: { workspaceId },
      });
      if (!respose.ok) {
        throw new Error("Failed to fetch workspace by id");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
