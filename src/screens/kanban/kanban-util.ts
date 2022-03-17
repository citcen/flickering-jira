import { useLocation } from "react-router";
import { useProjectDetail } from "utils/use-api";
import { useUrlQueryParam } from "utils/url-get-set";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 取地址栏的project id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
// 当前项目
export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

// 取url参数
export const useTasksSearchParams = () => {
  const [params] = useUrlQueryParam(["name", "typeId", "processorId", "tagId"]);

  return useMemo(
    () => ({
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
      name: params.name,
    }),
    [params]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
