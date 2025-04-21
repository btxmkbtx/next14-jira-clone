import { parseAsString, useQueryState } from "nuqs";

// 基于useCreateTaskModal修改作成
export const useEditTaskModal = () => {
  // 设计目的：希望把taskId同步到页面url中
  const [taskId, setTaskId] = useQueryState("edit-task", parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
};
