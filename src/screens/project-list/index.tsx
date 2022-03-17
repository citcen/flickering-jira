import React, { useMemo } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects, useUsers } from "utils/use-api";
import { useUrlQueryParam } from "utils/url-get-set";
import {
  ButtonNoPadding,
  ErrorBox,
  ListRow,
  ScreenContainer,
} from "components/lib";
import { useProjectModal } from "./project-util";

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
  const { open } = useProjectModal();

  useDocumentTitle("项目列表", false);
  return (
    <ScreenContainer>
      <ListRow between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </ListRow>

      <SearchPanel param={listParam} setParam={setParam} />
      <ErrorBox error={error} />

      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = true;
