/* 异步请求的统一 */
import { List } from "screens/project-list/list";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";

// 查询 projects
export const useProjects = (param?: Partial<List>) => {
  const pageReq = useHttp();

  return useQuery<List[]>(["projects", param], () =>
    pageReq(
      `projects/${param?.personId ? param?.personId : "all"}/${
        param?.name ? param.name : "all"
      }`
    )
  );
};

// 查询 users
export const useUsers = () => {
  const pageReq = useHttp();
  return useQuery("user", () => pageReq("users"));
};

// 修改 projects
export const useEditProject = () => {
  const pageReq = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<List>) =>
      pageReq(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      // 修改之后重新查询
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
