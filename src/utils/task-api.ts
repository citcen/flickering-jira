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
  console.log(param);

  return useQuery<Task[]>(["tasks", param], () =>
    pageReq(`tasks${param ? null : "all"}`, { data: param })
  );
};

// 查询任务type
export const useTaskTypes = () => {
  const pageReq = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => pageReq(`taskTypes`));
};
