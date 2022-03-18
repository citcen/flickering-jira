import { useLocation } from "react-router";
import { useProjectDetail } from "utils/use-api";
import { useUrlQueryParam } from "utils/url-get-set";
import { useCallback, useMemo } from "react";
import { useTaskDetail } from "utils/task-api";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 取地址栏的project id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
// 当前项目
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

// 取url参数
export const useTasksSearchParams = () => {
  const [params] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
      name: params.name,
    }),
    [projectId, params]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

// 编辑task的弹窗state
export const useTaskModal = () => {
  const [{ taskEditingId }, setTaskEditingId] = useUrlQueryParam([
    "taskEditingId",
  ]); // 编辑的taskId

  const { data: taskDetailData, isLoading } = useTaskDetail(taskEditingId);

  const startEdit = useCallback(
    (taskId: number | string) => {
      setTaskEditingId({ taskEditingId: taskId });
    },
    [setTaskEditingId]
  );

  const close = useCallback(() => {
    setTaskEditingId({ taskEditingId: "" });
  }, [setTaskEditingId]);

  return {
    taskEditingId,
    taskDetailData,
    isLoading,
    close,
    startEdit,
  };
};
