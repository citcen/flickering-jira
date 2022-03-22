import { Button, Drawer, Form, Input, Spin } from "antd";
import { DrawerProps } from "antd/es/drawer";
import styled from "@emotion/styled";
import { ErrorBox } from "components/lib";
import { useAddTaskGroup } from "utils/taskgroup-api";
import { useTaskGroupQueryKey } from "./taskgroup-util";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { useProjectIdInUrl } from "screens/kanban/kanban-util";

export const CreateTaskGroup = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const {
    mutate: addTaskGroup,
    isLoading,
    error,
  } = useAddTaskGroup(useTaskGroupQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addTaskGroup({ ...values, projectId: projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"任务组名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
