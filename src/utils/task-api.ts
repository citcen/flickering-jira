import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig,
} from "./use-optimistic-updates";
import { Task, TaskType } from "types/task";
import { SortProps } from "types/sort";

// 查询任务
export const useTasks = (param?: Partial<Task>) => {
  const pageReq = useHttp();
  const haveId = !!param?.projectId;

  return useQuery<Task[]>(["tasks", param], () =>
    pageReq(`tasks/${param && haveId ? "" : "all"}`, { data: param })
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

// 查询task详情
export const useTaskDetail = (id?: number | string) => {
  const pageReq = useHttp();

  return useQuery<Task>(
    ["taskDetail", { id }],
    () => pageReq(`taskDetail/${id}`),
    {
      enabled: !!id, // id 有值的时候才查询
    }
  );
};

// 修改 task
export const useEditTask = (queryKey: QueryKey) => {
  const pageReq = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      pageReq(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

// 删除task
export const useDeleteTask = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    ({ id }: { id: number | string }) =>
      pageReq(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// task排序
export const useReorderTask = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation((params: SortProps) => {
    return pageReq("tasks/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderTaskConfig(queryKey));
};
