import { useUrlQueryParam } from "utils/get-url-params";

// 新建项目页的state
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModelOpen: projectCreate === "true",
    open,
    close,
  };
};
