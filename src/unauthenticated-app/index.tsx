import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {isLogin ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsLogin(!isLogin)}>
        去{isLogin ? "注册" : "登录"}
      </button>
    </div>
  );
};
