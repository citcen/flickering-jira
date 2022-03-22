import { useDocumentTitle } from "utils";
import { useReorderKanban, useKanbans } from "utils/kanban-api";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./kanban-util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task-api";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";
import { useCallback } from "react";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"KANBAN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    draggableId={`kanban${kanban.id}`}
                    index={index}
                    key={kanban.id}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorederKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorederTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "KANBAN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) return;
        const sortType = destination.index > source.index ? "after" : "before";
        reorederKanban({ fromId, referenceId: toId, type: sortType });
      }
      // task 排序
      if (type === "TASK") {
        const fromKanbanId = source.droppableId;
        const toKanbanId = destination.droppableId;
        const fromTask = tasks.filter(
          (task) => String(task.kanbanId) === String(fromKanbanId)
        )[source.index];
        const toTask = tasks.filter(
          (task) => String(task.kanbanId) === String(toKanbanId)
        )[destination.index];
        if (fromTask?.id === toTask?.id) return;
        reorederTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorederKanban, tasks, reorederTask]
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
  max-height: 400px;
`;
