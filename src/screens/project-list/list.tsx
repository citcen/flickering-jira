import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/es/table";

export interface List {
  id: string;
  personId: string;
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
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
