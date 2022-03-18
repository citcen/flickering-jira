import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./project-util";
import { UserSelect } from "components/user-select";
import { useEditProject, useAddProject } from "utils/use-api";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const [form] = useForm();
  const { projectModelOpen, close, projectEditData, isLoading } =
    useProjectModal();

  const useMutateProject = projectEditData ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const onFinish = (values: any) => {
    mutateAsync({ ...projectEditData, ...values }).then(() => {
      closeModal();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(projectEditData);
  }, [projectEditData, form]);

  const title = projectEditData ? "编辑项目" : "新建项目";
  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModelOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>
              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultName={"负责人"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button
                  loading={mutateLoading}
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
