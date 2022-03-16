import { useLocation } from "react-router";
import { useProjectDetail } from "utils/use-api";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  // 取地址栏的project id
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProjectDetail(useProjectIdInUrl());
