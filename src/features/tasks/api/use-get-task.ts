import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["task", taskId], //reload by taskId
    queryFn: async () => {
      const respose = await client.api.tasks[":taskId"].$get({
        param: { taskId },
      });
      if (!respose.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const { data } = await respose.json();
      return data;
    },
  });

  return query;
};
