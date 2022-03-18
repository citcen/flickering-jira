import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-updates";
import { Task, TaskType } from "types/task";

// 查询任务
export const useTasks = (param?: Partial<Task>) => {
  const pageReq = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    pageReq(`tasks${param ? null : "all"}`, { data: param })
  );
};

// 查询任务type
export const useTaskTypes = (param?: Partial<Task>) => {
  const pageReq = useHttp();

  return useQuery<TaskType[]>(["taskTypes", param], () => pageReq(`taskTypes`));
};

// 添加 看板
export const useAddTask = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      pageReq(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
