// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/login", (req, res, ctx) => {
    console.log(1);
    // 在会话中保留用户的身份验证
    sessionStorage.setItem("is-authenticated", "true");

    return res(ctx.status(200));
  }),

  rest.get("/user", (req, res, ctx) => {
    // 检查用户是否在此会话中通过身份验证
    const isAuthenticated = sessionStorage.getItem("is-authenticated");

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    // 如果经过身份验证，则返回用户详细信息
    return res(
      ctx.status(200),
      ctx.json({
        username: "admin",
      })
    );
  }),
];
