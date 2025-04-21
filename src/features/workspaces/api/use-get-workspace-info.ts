import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetWorkspaceInfoProps {
  workspaceId: string;
}

export const useGetWorkspaceInfo = ({
  workspaceId,
}: UseGetWorkspaceInfoProps) => {
  const query = useQuery({
    queryKey: ["workspace-info", workspaceId], //reload by workspaceId
    queryFn: async () => {
      const respose = await client.api.workspaces[":workspaceId"]["info"].$get({
        param: { workspaceId },
      });
      if (!respose.ok) {
        throw new Error("Failed to fetch workspace info");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
