// src/mocks/handlers.js
import { rest } from "msw";
import { getToken } from "../auth-provider";
import { nanoid } from "nanoid";
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
    creationTime: 1600229787312,
    pin: false,
  },
  {
    id: 2,
    name: "团购APP",
    personId: 2,
    organization: "团购组",
    creationTime: 1600229787312,
    pin: false,
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 3,
    organization: "物料组",
    creationTime: 1594500007512,
    pin: true,
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 4,
    organization: "总部组",
    creationTime: 16055729750002,
    pin: true,
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "送餐组",
    creationTime: 16065729750002,
    pin: true,
  },
];

const defaultProjectData = {
  id: nanoid(),
  name: "",
  personId: null,
  organization: "",
  creationTime: new Date().getTime(),
  pin: false,
};

interface ProjectsData {
  id: string;
  name: string;
  personId: string;
  organization: string;
  creationTime?: number;
  pin: boolean;
}
// 将初始化数据存入 window.localStorage
window.localStorage.getItem("projectsData") ||
  window.localStorage.setItem("projectsData", JSON.stringify(projectsData));

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

  // 修改
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

  // 查询
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

  // 查询详情
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

  // 添加
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
];
