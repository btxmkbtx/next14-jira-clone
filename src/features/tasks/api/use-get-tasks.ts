import { TaskStatus } from "@/features/tasks/types";
import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetTasksProps {
  workspaceId: string;
  projectId?: string;
  status?: TaskStatus;
  search?: string;
  assigneeId?: string;
  dueDate?: string;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  search,
  assigneeId,
  dueDate,
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      search,
      assigneeId,
      dueDate,
    ], //reload by workspaceId, projectId, status, search, assigneeId, dueDate
    queryFn: async () => {
      const respose = await client.api.tasks.$get({
        query: { workspaceId, projectId, status, search, assigneeId, dueDate },
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
