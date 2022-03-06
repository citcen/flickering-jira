import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ListRow } from "./components/lib";
import { ReactComponent as HeaderLogo } from "assets/header-logo.svg";
import { Button, Dropdown, Menu } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <HeaderLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
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
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;

const PageHeader = styled(ListRow)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(ListRow)``;

const HeaderRight = styled.div``;

const Main = styled.div``;
