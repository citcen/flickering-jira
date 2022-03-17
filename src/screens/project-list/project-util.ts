import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url-get-set";
import { useProjectDetail } from "utils/use-api";
import { useMemo } from "react";

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

// 新建项目页的state
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate", // 是否创建的url参数
  ]);
  const [{ projectEditingId }, setProjectEditingId] = useUrlQueryParam([
    "projectEditingId", // 是否在编辑的url参数
  ]);
  const setUrlParams = useSetUrlSearchParam();

  const { data: projectEditing, isLoading } = useProjectDetail(
    Number(projectEditingId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", projectEditingId: "" });

  const startEdit = (id: number) =>
    setProjectEditingId({ projectEditingId: id });

  return {
    projectModelOpen: projectCreate === "true" || !!projectEditingId,
    open,
    close,
    startEdit,
    projectEditing,
    isLoading,
  };
};
