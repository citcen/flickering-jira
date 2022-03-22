import { QueryKey, useQueryClient } from "react-query";
import { reorder } from "./reorder";
import { Task } from "types/task";

// 生成react-query的配置，（请求成功、失败、乐观更新）
export const useQueryConfig = (
  queryKey: QueryKey,
  callBack: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    // 成功之后重新查询
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 乐观更新 optimistic updates（onMutate在useMutation触发时立即调用）
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey);
      // 找到缓存的数据遍历
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callBack(target, old);
      });
      return { previousItems }; // 原数据
    },
    onError(error: any, newItem: any, context: any) {
      // 报错时回滚原数据
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

// 乐观更新的删除
export const useDeleteConfig = (queryKey: QueryKey) =>
  useQueryConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
// 乐观更新的编辑
export const useEditConfig = (queryKey: QueryKey) =>
  useQueryConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
// 乐观更新的添加
export const useAddConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, old) => (old ? [...old, target] : []));
// kanban排序的乐观更新
export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, old) => reorder({ list: old, ...target }));
// task排序的乐观更新
export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useQueryConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });
