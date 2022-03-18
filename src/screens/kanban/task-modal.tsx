import { useTaskModal, useTasksQueryKey } from "./kanban-util";
import { useForm } from "antd/es/form/Form";
import { useEditTask } from "utils/task-api";
import { useEffect } from "react";
import { Form, Input, Modal, Spin } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { taskEditingId, taskDetailData, close, isLoading } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...taskDetailData, ...form.getFieldsValue() });
    onCancel();
  };

  useEffect(() => {
    form.setFieldsValue(taskDetailData);
  }, [form, taskDetailData]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!taskEditingId}
    >
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <Form {...layout} initialValues={taskDetailData} form={form}>
          <Form.Item
            label={"任务名"}
            name={"name"}
            rules={[{ required: true, message: "请输入任务名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"经办人"} name={"processorId"}>
            <UserSelect defaultName={"经办人"} />
          </Form.Item>
          <Form.Item label={"类型"} name={"typeId"}>
            <TaskTypeSelect />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
