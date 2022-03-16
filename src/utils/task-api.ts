import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-updates";
import { Task } from "types/task";

// 查询 看板
export const useTasks = (param?: Partial<Task>) => {
  const pageReq = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    pageReq(`tasks/`, { data: param })
  );
};
