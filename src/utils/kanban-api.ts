import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-updates";
import { Kanban } from "types/kanban";
import { SortProps } from "types/sort";

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
    ({ id }: { id: number | string }) =>
      pageReq(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// kanban排序
export const useReorderKanban = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation((params: SortProps) => {
    return pageReq("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
