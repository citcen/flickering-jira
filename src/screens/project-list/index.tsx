import React, { useMemo } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useTitle } from "../../utils";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProjects, useUsers } from "../../utils/use-api";
import { useUrlQueryParam } from "../../utils/get-url-params";

export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const listParam = useMemo(
    () => ({ ...param, personId: Number(param.personId) || undefined }),
    [param]
  );
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(listParam, 200));
  const { data: users } = useUsers();

  useTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={listParam} setParam={setParam} />
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
