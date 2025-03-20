import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
interface UseGetMembersProps {
  workspaceId: string;
}
export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const respose = await client.api.members.$get({ query: { workspaceId } });
      if (!respose.ok) {
        throw new Error("Failed to fetch members");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
