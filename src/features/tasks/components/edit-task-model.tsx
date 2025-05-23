"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { EditTaskFormWrapper } from "@/features/tasks/components/edit-task-modal-wrapper";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";

// 基于CreateTaskModal修改作成
export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper id={taskId} onCancel={close} />}
    </ResponsiveModal>
  );
};
