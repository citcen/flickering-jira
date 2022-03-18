import { Kanban } from "types/kanban";
import { useTasks, useTaskTypes } from "utils/task-api";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { useTaskModal, useTasksSearchParams } from "./kanban-util";
import { CreateTask } from "./create-task";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((item) => item.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  const { startEdit } = useTaskModal();
  return (
    <KanbanContainer>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {currentTasks?.map((task) => (
          <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: ".5rem", cursor: "pointer" }}
            key={task.name}
          >
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </KanbanContainer>
  );
};

export const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 27rem;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
