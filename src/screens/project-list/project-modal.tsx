import { Button, Drawer } from "antd";
import { useProjectModal } from "./project-util";

export const ProjectModal = () => {
  const { projectModelOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModelOpen} width={"100%"}>
      <h1>新建项目</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
