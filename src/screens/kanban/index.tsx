// 看板页
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban-api";
import { useProjectInUrl } from "./kanban-util";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans();
  return <div>Supervise</div>;
};
