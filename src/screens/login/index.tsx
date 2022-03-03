import { FormEvent } from "react";

const baseUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const Login = (param: { username: string; password: string }) => {
    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (resp) => {
      if (resp.ok) {
      }
    });
  };

  const handelSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const username = (evt.currentTarget[0] as HTMLInputElement).value;
    const password = (evt.currentTarget[1] as HTMLInputElement).value;

    Login({ username: username, password: password });
  };
  return (
    <form onSubmit={handelSubmit}>
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
