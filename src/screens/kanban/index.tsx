// 看板页
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban-api";
import { useProjectInUrl } from "./kanban-util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const kanbans = [
    {
      name: "待完成",
      id: 1,
      projectId: 2,
    },
    {
      name: "开发中",
      id: 2,
      projectId: 3,
    },
    {
      name: "已完成",
      id: 3,
      projectId: 4,
    },
  ];
  // const { data: kanbans } = useKanbans();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </div>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
