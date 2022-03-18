import { useEffect, useState } from "react";
import { useAddTask } from "utils/task-api";
import { useProjectIdInUrl, useTasksQueryKey } from "./kanban-util";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false); // 是否在输入状态
  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode(!inputMode); // 切换输入状态

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);
  // 不在输入状态时
  if (!inputMode) {
    return <div onClick={toggle}>+创建任务</div>;
  }
  // 在输入状态时
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"请输入任务名"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
