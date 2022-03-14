/* 异步请求的统一 */
import { useEffect } from "react";
import { useAsync } from "./use-async";
import { List } from "screens/project-list/list";
import { useHttp } from "./http";
import { User } from "components/user-select";

// 查询 projects
export const useProjects = (param?: Partial<List>) => {
  const pageReq = useHttp();
  const { run, ...result } = useAsync<List[]>();

  // 实时查询数据
  useEffect(() => {
    run(
      pageReq(
        `projects/${param?.personId ? param.personId : "all"}/${
          param?.name ? param.name : "all"
        }`
      )
    );
  }, [param, run]);

  return result;
};

// 查询 users
export const useUsers = () => {
  const pageReq = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(pageReq("users"));
  }, []);

  return result;
};

// 修改 projects
export const useEditProject = () => {
  const pageReq = useHttp();
  const { run, ...result } = useAsync();
  const mutate = (params: Partial<List>) => {
    return run(
      pageReq(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    result,
  };
};
