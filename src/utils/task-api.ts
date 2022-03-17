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
    pageReq(`tasks`, { data: param })
  );
};

// 查询任务type
export const useTaskTypes = (param?: Partial<TaskType>) => {
  const pageReq = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () =>
    pageReq(`taskTypes`, { data: param })
  );
};
