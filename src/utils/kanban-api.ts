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

  return useQuery<Kanban[]>(["kanbans", param], () => pageReq(`kanbans`));
};

// 添加 看板
export const useAddKanban = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      pageReq(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 删除看板
export const useDeleteKankan = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      pageReq(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
