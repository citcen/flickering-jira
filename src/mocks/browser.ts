import { setupWorker } from "msw";
import { handlers, authHandlers } from "./handlers";
// 这将使用给定的请求处理程序配置 Service Worker
export const worker = setupWorker(...handlers, ...authHandlers);
