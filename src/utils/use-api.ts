/* project和user */
import { Project } from "types/project";
import { useHttp } from "./http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-updates";

// 查询 projects
export const useProjects = (param?: Partial<Project>) => {
  const pageReq = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
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
export const useEditProject = (queryKey: QueryKey) => {
  const pageReq = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      pageReq(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
    /*// 修改之后重新查询
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // 乐观更新 optimistic updates（onMutate在useMutation触发时立即调用）
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey)
        // 找到缓存的数据遍历
        queryClient.setQueryData(queryKey, (old?: List[]) => {
          // 当和缓存的id一样时，把本次提交的数据覆盖上次的数据
          return old?.map(project => project.id === target.id ? {...project, ...target} : project) || []
        })
        return { previousItems } // 原数据
      },
      onError(error, newItem, context: any) { // 报错时回滚原数据
        queryClient.setQueryData(queryKey, context.previousItems)
      }*/
  );
};

// 查询project的详情
export const useProjectDetail = (id?: number | string) => {
  const pageReq = useHttp();

  return useQuery<Project>(
    ["projectDetail", { id }],
    () => pageReq(`projectDetail/${id}`),
    {
      enabled: !!id, // id 有值的时候才查询
    }
  );
};

// 添加项目
export const useAddProject = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      pageReq(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 删除项目
export const useDeleteProject = (queryKey: QueryKey) => {
  const pageReq = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      pageReq(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
