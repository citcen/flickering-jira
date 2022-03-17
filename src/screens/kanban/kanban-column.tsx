import { Kanban } from "types/kanban";
import { useTasks, useTaskTypes } from "utils/task-api";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const taskTypes = [
    {
      id: 1,
      name: "task",
    },
    {
      id: 2,
      name: "bug",
    },
  ];
  // const {data: taskTypes} = useTaskTypes()
  const name = taskTypes?.find((item) => item.id === id)?.name;
  if (!name) return null;
  return <img src={name === "task" ? taskIcon : bugIcon} alt={"task-icon"} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const allTasks = [
    {
      name: "管理注册界面开发",
      tags: [1, 2],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 1,
      favorite: true,
      typeId: 2,
      note: "请尽快完成",
    },
    {
      name: "管理登录界面开发",
      tags: [2],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 2,
      favorite: true,
      typeId: 2,
      note: "请使用JWT完成",
    },
    {
      name: "单元测试",
      tags: [1],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 3,
      favorite: true,
      typeId: 1,
      note: "",
    },
    {
      name: "性能优化",
      tags: [1],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 1,
      favorite: true,
      typeId: 2,
      note: "",
    },
    {
      name: "权限管理界面开发",
      tags: [1],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 3,
      favorite: true,
      typeId: 2,
      note: "",
    },
    {
      name: "UI开发",
      tags: [1],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 2,
      favorite: true,
      typeId: 2,
      note: "",
    },
    {
      name: "自测",
      tags: [1],
      reporterId: 1,
      processorId: 2,
      epicId: 1,
      kanbanId: 1,
      favorite: true,
      typeId: 1,
      note: "",
    },
  ];
  // const {data: allTasks} = useTasks()
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {currentTasks?.map((task) => (
          <Card style={{ marginBottom: ".5rem" }} key={task.name}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
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
