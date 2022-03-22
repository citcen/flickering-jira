import { ListRow, ScreenContainer } from "components/lib";
import { useProjectInUrl } from "screens/kanban/kanban-util";
import { useTaskGroup } from "utils/taskgroup-api";
import { useTaskGroupSearchParams } from "./taskgroup-util";
import { Button, List } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/task-api";
import { Link } from "react-router-dom";

export const TaskGroupScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: taskGroup } = useTaskGroup(useTaskGroupSearchParams());
  const { data: tasks } = useTasks({ processorId: currentProject?.id });

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}任务组</h1>
      <List
        dataSource={taskGroup}
        itemLayout={"vertical"}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <ListRow between={true}>
                  <span>{item.name}</span>
                  <Button type={"link"}>删除</Button>
                </ListRow>
              }
              description={
                <div>
                  <p>开始时间：{dayjs(item.startTime).format("YYYY-MM-DD")}</p>
                  <p>开始时间：{dayjs(item.endTime).format("YYYY-MM-DD")}</p>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.groupId === item.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?taskEditingId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
    </ScreenContainer>
  );
};
