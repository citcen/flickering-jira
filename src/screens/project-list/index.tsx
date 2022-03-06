import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

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
    pageReq(
      `projects/${param.personId ? param.personId : "all"}/${
        param.name ? param.name : "all"
      }`
    ).then(setList);
  }, [debounceParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
