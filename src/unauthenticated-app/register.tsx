import { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const RegisterScreen = () => {
  const { register } = useAuth();

  const handelSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const username = (evt.currentTarget[0] as HTMLInputElement).value;
    const password = (evt.currentTarget[1] as HTMLInputElement).value;
    register({ username: username, password: password });
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
      <button type={"submit"}>注册</button>
    </form>
  );
};
