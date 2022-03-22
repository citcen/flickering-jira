import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-updates";
import { TaskGroup } from "types/task-group";

// 查询 任务组
export const useTaskGroup = (param?: Partial<TaskGroup>) => {
  const pageReq = useHttp();

  return useQuery<TaskGroup[]>(["taskGroup", param], () =>
    pageReq(`taskGroup`)
  );
};
