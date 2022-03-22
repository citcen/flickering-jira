import { useProjectIdInUrl } from "screens/kanban/kanban-util";

export const useTaskGroupSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useTaskGroupQueryKey = () => [
  "taskGroup",
  useTaskGroupSearchParams(),
];
