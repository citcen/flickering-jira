// src/mocks/handlers.js
import { rest } from "msw";
import { nanoid } from "nanoid";
const baseUrl = process.env.REACT_APP_API_URL;

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

  rest.get(`${baseUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
      ])
    );
  }),

  rest.get(`${baseUrl}/projects`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
          personId: 5,
          organization: "送餐组",
        },
      ])
    );
  }),
];
