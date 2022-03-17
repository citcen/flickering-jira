// src/mocks/handlers.js
import { rest } from "msw";
import { getToken } from "../auth-provider";
import { nanoid } from "nanoid";
import {
  defaultProjectData,
  kanbansData,
  ProjectsData,
  projectsData,
  tasksData,
  taskTypesData,
  usersData,
} from "./datas";
const baseUrl = process.env.REACT_APP_API_URL;

// 将初始化数据存入 window.localStorage
window.localStorage.getItem("projectsData") ||
  window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
window.localStorage.getItem("kanbansData") ||
  window.localStorage.setItem("kanbansData", JSON.stringify(kanbansData));

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    const reqBody: any = req.body;
    if (reqBody.username === "1") {
      return res(
        ctx.status(400),
        ctx.json({
          message: "用户名或密码错误",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: nanoid(),
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),

  rest.post(`${baseUrl}/register`, (req, res, ctx) => {
    const reqBody: any = req.body;
    if (reqBody.username === "111") {
      return res(
        ctx.status(400),
        ctx.json({
          message: "用户名已注册",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: nanoid(),
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),
];

export const authHandlers = [
  // 用户
  rest.get(`${baseUrl}/users?`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(usersData));
  }),
  // 修改 project
  rest.patch(`${baseUrl}/projects/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;
    if (req.params?.id) {
      let projectsData = JSON.parse(
        window.localStorage.getItem("projectsData") || ""
      );
      let newData: any = [];
      projectsData.map((item: ProjectsData) => {
        if (String(item.id) === req.params.id) {
          newData.push({ ...item, ...data });
        } else newData.push({ ...item });
      });
      const projectData = [
        projectsData.find(
          (item: ProjectsData) => String(item.id) === req.params?.id
        ),
      ];
      window.localStorage.setItem("projectsData", JSON.stringify(newData));
      return res(ctx.status(200), ctx.json(projectData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 查询 project
  rest.get(`${baseUrl}/projects/:personId/:name`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { personId, name } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    if (personId !== "all") {
      projectsData = [
        projectsData.find(
          (item: ProjectsData) => String(item.personId) === personId
        ),
      ];
    }
    if (name !== "all") {
      projectsData = [
        projectsData.find((item: ProjectsData) => String(item.name) === name),
      ];
    }
    if (projectsData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(projectsData));
    }
    return res(ctx.status(200), ctx.json([]));
  }),
  // 查询 project 详情
  rest.get(`${baseUrl}/projectDetail/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    projectsData = [
      projectsData.find((item: ProjectsData) => String(item.id) === id),
    ];
    if (projectsData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(projectsData[0]));
    }
    return res(ctx.status(200), ctx.json({}));
  }),
  // 添加 project
  rest.post(`${baseUrl}/projects`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let projectsData = JSON.parse(
        window.localStorage.getItem("projectsData") || ""
      );
      projectsData.push({ ...defaultProjectData, ...data });

      window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
      return res(ctx.status(200), ctx.json(projectsData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 删除 project
  rest.delete(`${baseUrl}/projects/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    projectsData = projectsData.filter(
      (item: ProjectsData) => String(item.id) !== id
    );
    if (projectsData) {
      window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
      return res(
        ctx.status(200),
        ctx.json({
          message: "删除成功",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "删除失败",
        })
      );
    }
  }),
  // 查询看板
  rest.get(`${baseUrl}/kanbans`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const kanbansData = JSON.parse(
      window.localStorage.getItem("kanbansData") || ""
    );
    return res(ctx.status(200), ctx.json(kanbansData));
  }),
  // 查询看板任务
  rest.get(`${baseUrl}/tasks:params`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(tasksData));
  }),
  // 查询看板任务type
  rest.get(`${baseUrl}/taskTypes`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(taskTypesData));
  }),
  // 添加看板
  rest.post(`${baseUrl}/kanbans`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let kanbansData = JSON.parse(
        window.localStorage.getItem("kanbansData") || ""
      );
      kanbansData.push({ id: nanoid(), ...data });

      window.localStorage.setItem("kanbansData", JSON.stringify(kanbansData));
      return res(ctx.status(200), ctx.json(kanbansData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
];
