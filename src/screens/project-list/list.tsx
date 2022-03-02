import React from "react";
import { User } from "./search-panel";

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
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.personId}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name || "无"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
