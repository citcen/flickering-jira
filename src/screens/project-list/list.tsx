import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";

interface List {
  id: string;
  personId: string;
  name: string;
  organization: string;
}

interface ListProps {
  list: List[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      dataSource={list}
    />
  );
};
