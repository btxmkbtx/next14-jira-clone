import { TaskIdClient } from "@/app/(dashboard)/workspaces/[workspaceId]/tasks/[taskId]/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

const TaskIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sigin-in");

  // 带有更新功能的页面要把内容设计到客户端组件中
  return <TaskIdClient />;
};

export default TaskIdPage;
