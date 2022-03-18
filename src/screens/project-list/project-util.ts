import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url-get-set";
import { useProjectDetail } from "utils/use-api";
import { useCallback, useMemo } from "react";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

// 项目列表页的queryKey
export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};

// 新建/编辑项目页的state
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate", // 是否创建
  ]);
  const [{ projectEditingId }, setProjectEditingId] = useUrlQueryParam([
    "projectEditingId", // 在编辑中的projectId
  ]);
  const setUrlParams = useSetUrlSearchParam();

  const { data: projectEditData, isLoading } =
    useProjectDetail(projectEditingId);

  const open = () => setProjectCreate({ projectCreate: true });

  const close = () => setUrlParams({ projectCreate: "", projectEditingId: "" });

  const startEdit = useCallback(
    (id: number | string) => setProjectEditingId({ projectEditingId: id }),
    [setProjectEditingId]
  );

  return {
    projectModelOpen: projectCreate === "true" || !!projectEditingId,
    open,
    close,
    startEdit,
    projectEditData: projectEditData,
    isLoading,
  };
};
