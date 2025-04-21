import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetProjectProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ["project", projectId], //reload by projectId
    queryFn: async () => {
      const respose = await client.api.projects[":projectId"].$get({
        param: { projectId },
      });
      if (!respose.ok) {
        throw new Error("Failed to fetch project by id");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
