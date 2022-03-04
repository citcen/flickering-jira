import { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handelSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const username = (evt.currentTarget[0] as HTMLInputElement).value;
    const password = (evt.currentTarget[1] as HTMLInputElement).value;
    login({ username: username, password: password });
  };
  return (
    <form onSubmit={handelSubmit}>
      {user ? <div>登录成功，用户名：{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
