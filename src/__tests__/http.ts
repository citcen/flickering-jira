import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;
const server = setupServer();

// 测试前先执行回调函数
beforeAll(() => server.listen());
// 测试后，重置mock路由
afterEach(() => server.resetHandlers());
// 关闭路由
afterAll(() => server.close());

test("http方法发送异步请求", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, context) =>
      res(context.json(mockResult))
    )
  );
  const result = await http(endpoint);

  expect(result).toEqual(mockResult);
});

test("http请求时会在header里带上token", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
