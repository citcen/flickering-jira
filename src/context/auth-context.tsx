// 全局状态
import React, { ReactNode, useCallback, useContext, useState } from "react";
import * as auth from "auth-provider";
import { useMount } from "../utils";
import { getUser } from "auth-provider";
import { User } from "components/user-select";
import * as authStore from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useMount(() => {
    setUser(JSON.parse(getUser() as string));
  });

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};
