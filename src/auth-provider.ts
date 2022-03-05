/* 用户授权。使用第三方auth服务(firebase/auth0)可不开发 */

import { User } from "./screens/project-list/search-panel";
const localStorageKey = "__auth_provider_token__";
const localStorageUser = "__user_msg__";
const baseUrl = process.env.REACT_APP_API_URL;

// 获取token
export const getToken = () => window.localStorage.getItem(localStorageKey);
// 获取user
export const getUser = () => window.localStorage.getItem(localStorageUser);

// 设置token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  window.localStorage.setItem(localStorageUser, JSON.stringify(user));
  return user;
};

// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (resp) => {
    if (resp.ok) {
      return handleUserResponse(await resp.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 登出
export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
  window.localStorage.removeItem(localStorageUser);
};
