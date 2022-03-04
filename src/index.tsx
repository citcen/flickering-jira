import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";
import App from "./App";

// 开发环境开启 mock 服务
if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start({
    // 对于没有 mock 的接口直接通过，避免异常
    onUnhandledRequest: "bypass",
  });
}

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
