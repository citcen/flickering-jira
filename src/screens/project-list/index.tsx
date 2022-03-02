import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs";

const baseUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // 用户选择数据
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 300);
  // 项目负责人
  const [users, setUsers] = useState([]);

  // 项目数据
  const [list, setList] = useState([]);
  // 查询负责人
  useMount(() => {
    fetch(`${baseUrl}/users`).then(async (resp) => {
      if (resp.ok) {
        setUsers(await resp.json());
      }
    });
  });
  // 实时查询数据
  useEffect(() => {
    fetch(
      `${baseUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (resp) => {
      if (resp.ok) {
        setList(await resp.json());
      }
    });
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
