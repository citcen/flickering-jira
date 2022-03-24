global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };
import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "screens/project-list";
import { AppProviders } from "context";
import { projectsData, usersData } from "mocks/datas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(usersData))),
  rest.get(`${apiUrl}/projects/:personId/:name`, (req, res, ctx) => {
    const { personId, name } = req.params as any;
    let newData: any = projectsData;
    if (personId !== "all") {
      newData = [
        newData.find((item: any) => String(item.personId) === personId),
      ];
    }
    if (name !== "all") {
      newData = projectsData.filter(
        (item: any) => item.name.indexOf(name as string) > -1
      );
    }
    return res(ctx.json(newData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument(), {
    timeout: 1000,
  });

test("项目列表展示正常", async () => {
  renderScreen(
    <Router>
      <Routes>
        <Route path={"/projects"} element={<ProjectListScreen />} />
      </Routes>
    </Router>,
    { route: "/projects" }
  );
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(projectsData.length + 1);
});

test("搜索项目", async () => {
  renderScreen(
    <Router>
      <Routes>
        <Route path={"/projects"} element={<ProjectListScreen />} />
      </Routes>
    </Router>,
    { route: "/projects?name=骑手" }
  );
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<AppProviders>{ui}</AppProviders>);
};
