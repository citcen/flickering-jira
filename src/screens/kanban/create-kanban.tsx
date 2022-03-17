import { useState } from "react";
import { useKanbansQueryKey, useProjectIdInUrl } from "./kanban-util";
import { useAddKanban } from "utils/kanban-api";
import { Input } from "antd";
import { KanbanContainer } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <KanbanContainer>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </KanbanContainer>
  );
};
