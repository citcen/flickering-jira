// src/mocks/handlers.js
import { rest } from "msw";
import { getToken } from "../auth-provider";
const baseUrl = process.env.REACT_APP_API_URL;
const usersData = [
  {
    id: 1,
    name: "张三",
  },
  {
    id: 2,
    name: "李四",
  },
  {
    id: 3,
    name: "王五",
  },
  {
    id: 4,
    name: "赵六",
  },
];
const projectsData = [
  {
    id: 1,
    name: "骑手管理",
    personId: 1,
    organization: "外卖组",
  },
  {
    id: 2,
    name: "团购APP",
    personId: 2,
    organization: "团购组",
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 3,
    organization: "物料组",
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 4,
    organization: "总部组",
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "送餐组",
  },
];

interface ProjectsData {
  id: string;
  name: string;
  personId: string;
  organization: string;
}
// 将初始化数据存入 window.localStorage
window.localStorage.getItem("projectsData") ||
  window.localStorage.setItem("projectsData", JSON.stringify(projectsData));

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),

  rest.post(`${baseUrl}/register`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),
];

export const authHandlers = [
  rest.get(`${baseUrl}/users?`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(usersData));
  }),

  rest.get(`${baseUrl}/projects/:personId/:name`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: "请重新登录",
        })
      );
    }
    const { personId, name } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    if (personId !== "all") {
      projectsData = [
        projectsData.find((item: ProjectsData) => item.personId == personId),
      ];
    }
    if (name !== "all") {
      projectsData = [
        projectsData.find((item: ProjectsData) => item.name == name),
      ];
    }
    if (projectsData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(projectsData));
    } else return res(ctx.status(500), ctx.json("查询为空"));
  }),
];
