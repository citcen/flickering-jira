import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState } from "react";
import { useDebounce, useTitle } from "../../utils";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProjects, useUsers } from "../../utils/use-api";
import { useUrlQueryParam } from "../../utils/get-url-params";

export const ProjectListScreen = () => {
  // 用户选择数据
  /*const [, setParam] = useState({
    name: "",
    personId: "",
  });*/
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUsers();

  useTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
