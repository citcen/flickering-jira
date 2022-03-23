import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-updates";
import { TaskGroup } from "types/task-group";
import { Kanban } from "types/kanban";

// 查询 任务组
export const useTaskGroup = (param?: Partial<TaskGroup>) => {
  const pageReq = useHttp();

  return useQuery<TaskGroup[]>(["taskGroup", param], () =>
    pageReq(`taskGroup`)
  );
};

// 删除看板
export const useDeleteTaskGroup = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    ({ id }: { id: number | string }) =>
      pageReq(`taskGroup/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 添加 看板
export const useAddTaskGroup = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      pageReq(`taskGroup`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
