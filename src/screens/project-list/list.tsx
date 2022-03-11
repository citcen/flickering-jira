import { User } from "components/user-select";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";

export interface List {
  id: number;
  personId: number;
  name: string;
  organization: string;
  creationTime: number;
}

interface ListProps extends TableProps<List> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      {...props}
      rowKey={(record) => record.id}
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "无"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.creationTime
                  ? dayjs(project.creationTime).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
    />
  );
};
