import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban-api";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./kanban-util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task-api";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanIsLoading || taskIsLoading;
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
    </ScreenContainer>
  );
};
const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
