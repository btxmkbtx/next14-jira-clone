import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TaskActions } from "@/features/tasks/components/task-actions";
import { TaskDate } from "@/features/tasks/components/task-date";
import { Task } from "@/features/tasks/types";
import { MoreHorizontal } from "lucide-react";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
        </TaskActions>
      </div>
      <div className="flex items-center gap-x-1.5">
        {/* 看一下src\features\tasks\server\route.ts的getAPI返回结果里是有assignee的，只是我们没有在Task的type中明确声明而已，
        因为Models.Document的{[key: string]: any;}运行我们随便填充自定义的返回项目 */}
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px] "
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.dueDate} className="text-xs" />
      </div>
      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};
