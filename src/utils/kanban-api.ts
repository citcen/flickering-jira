import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-updates";
import { Kanban } from "types/kanban";

// 查询 看板
export const useKanbans = (param?: Partial<Kanban>) => {
  const pageReq = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    pageReq(`kanbans/`, { data: param })
  );
};
