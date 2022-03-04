import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs";
import { useHttp } from "../../utils/http";

const baseUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  // 用户选择数据
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 300);
  const [users, setUsers] = useState([]); // 项目负责人
  const [list, setList] = useState([]); // 项目数据
  const pageReq = useHttp();

  useMount(() => {
    // 查询负责人
    pageReq("users").then(setUsers);
  });
  // 实时查询数据
  useEffect(() => {
    pageReq("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
