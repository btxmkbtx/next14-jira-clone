import { WorkspaceIdSettingsClient } from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params, //服务器组件的取参方式
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  // 带有更新功能的页面要把内容设计到客户端组件中
  return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
