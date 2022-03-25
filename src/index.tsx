import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import { AppProviders } from "./context";
import App from "./App";

const { worker } = require("./mocks/browser");
worker.start({
  // 对于没有 mock 的接口直接通过，避免异常
  onUnhandledRequest: "bypass",
});

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
