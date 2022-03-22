import { Link, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { TaskGroupScreen } from "screens/task-group";
import styled from "@emotion/styled";
import { Menu } from "antd";

// 截取url地址用于左菜单高亮的key
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"taskGroup"}>
            <Link to={"taskGroup"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />} />
          <Route path={"taskGroup"} element={<TaskGroupScreen />} />
          {/*// <Route index element={<KanbanScreen />} />*/}
          <Route
            path={"/"}
            element={
              <Navigate
                to={`${window.location.pathname}/kanban`}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;

const Aside = styled.aside`
  display: flex;
  background-color: rgb(244, 245, 247);
`;

const Main = styled.div`
  display: flex;
  overflow: hidden;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;
