import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, ListRow } from "components/lib";
import { ReactComponent as HeaderLogo } from "assets/header-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  // 创建项目
  const projectButtonJSX = (
    <ButtonNoPadding type={"link"} onClick={() => setProjectModalOpen(true)}>
      创建项目
    </ButtonNoPadding>
  );
  return (
    <Container>
      <PageHeader projectButton={projectButtonJSX} />
      <Main>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={<ProjectListScreen projectButton={projectButtonJSX} />}
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route path={"/"} element={<Navigate to={"/projects"} />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <HeaderLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"}>Hi, {user?.name}</Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const Header = styled(ListRow)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(ListRow)``;

const HeaderRight = styled.div``;

const Main = styled.div``;
