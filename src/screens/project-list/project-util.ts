import { useSetUrlSearchParam, useUrlQueryParam } from "utils/get-url-params";
import { useProjectDetail } from "utils/use-api";

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
