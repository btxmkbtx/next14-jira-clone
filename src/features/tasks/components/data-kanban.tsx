import { KanbanCard } from "@/features/tasks/components/kanban-card";
import { KanbanColumnHeader } from "@/features/tasks/components/kanban-column-header";
import { Task, TaskStatus, UpdateKanbanPayLoad } from "@/features/tasks/types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  // 类型导入（Type-Only Imports）明确告诉 TypeScript 和打包工具：DropResult 仅作为类型使用，不会在运行时保留。
  type DropResult,
} from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
  onChange: (tasks: UpdateKanbanPayLoad[]) => void;
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    Object.keys(initialTasks).forEach((i) => {
      initialTasks[i as TaskStatus].sort((a, b) => a.position - b.position);
    });

    return initialTasks;
  });

  useEffect(() => {
    const newTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => newTasks[task.status].push(task));

    Object.keys(newTasks).forEach((status) => {
      newTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
    });

    setTasks(newTasks);
  }, [data]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;

      const { source, destination } = result;
      const sourceStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;

      let updatesPayLoad: UpdateKanbanPayLoad[] = [];

      setTasks((prevTasks) => {
        // 拷贝一份tasks分类数组集对象
        const newTasks = { ...prevTasks };

        // safely remove the task from the source column
        const sourceColumn = [...newTasks[sourceStatus]];
        // 从移动元抽取出被拖拽的task,[movedTask]是一个语法糖，表示取出数组中的首位，赋予变量movedTask
        const [movedTask] = sourceColumn.splice(source.index, 1); //splice会改变原数组
        // if there's no moved task(实际操作上不可能发生，只是一条理论上的case), return the privious status
        if (!movedTask) {
          return prevTasks;
        }

        // 修改拖拽对象task的状态
        const updatedMovedTask =
          sourceStatus != destStatus
            ? { ...movedTask, status: destStatus }
            : movedTask;

        // 更新拖拽元的任务列表，sourceColumn中的拖拽元，此时已经被上面的splice移除
        newTasks[sourceStatus] = sourceColumn;

        //把抽出的拖拽元task添加到目的地任务列表中
        const destColumn = [...newTasks[destStatus]];
        destColumn.splice(destination.index, 0, updatedMovedTask);
        newTasks[destStatus] = destColumn;

        // Prepare minimal update payloads
        updatesPayLoad = [];

        // Always update the moved task
        updatesPayLoad.push({
          $id: updatedMovedTask.$id,
          status: destStatus,
          position: Math.min((destination.index + 1) * 1000, 1_000_000), //参数二表示计算上限封顶为1_000_000
        });

        // 移动先任务列表重新排序
        newTasks[destStatus].forEach((task, index) => {
          if (task && task.$id !== updatedMovedTask.$id) {
            const newPosition = Math.min((index + 1) * 1000, 1_000_000);
            if (task.position !== newPosition) {
              updatesPayLoad.push({
                $id: task.$id,
                status: destStatus,
                position: newPosition,
              });
            }
          }
        });

        // 移动元任务列表重新排序
        if (sourceStatus !== destStatus) {
          newTasks[sourceStatus].forEach((task, index) => {
            if (task) {
              const newPosition = Math.min((index + 1) * 1000, 1_000_000);
              if (task.position !== newPosition) {
                updatesPayLoad.push({
                  $id: task.$id,
                  status: sourceStatus,
                  position: newPosition,
                });
              }
            }
          });
        }

        return newTasks;
      });

      onChange(updatesPayLoad);
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex overflow-x-auto">
        {boards.map((board) => {
          return (
            <div
              key={board}
              className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]"
            >
              <KanbanColumnHeader
                board={board}
                taskCount={tasks[board].length}
              />
              <Droppable droppableId={board}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px] py-1.5"
                  >
                    {tasks[board].map((task, index) => (
                      <Draggable
                        key={task.$id}
                        draggableId={task.$id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <KanbanCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};
