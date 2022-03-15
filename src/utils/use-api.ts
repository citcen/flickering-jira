/* 异步请求的统一 */
import { List } from "screens/project-list/list";
import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { cleanObject } from "./index";

// 查询 projects
export const useProjects = (param?: Partial<List>) => {
  const pageReq = useHttp();

  /* return useQuery<List[]>(["projects", cleanObject(param)], () =>
      pageReq("projects", { data: param })
  );*/
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

// 查询project的详情
export const useProjectDetail = (id?: number) => {
  const pageReq = useHttp();

  return useQuery<List>(
    ["projectDetail", { id }],
    () => pageReq(`projectDetail/${id}`),
    {
      enabled: !!id, // id 有值的时候才查询
    }
  );
};

// 添加项目
export const useAddProject = () => {
  const pageReq = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<List>) =>
      pageReq(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
