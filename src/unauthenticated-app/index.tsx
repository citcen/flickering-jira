import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Button, Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isLogin ? <LoginScreen /> : <RegisterScreen />}
        <Button onClick={() => setIsLogin(!isLogin)}>
          去{isLogin ? "注册" : "登录"}
        </Button>
      </Card>
    </div>
  );
};
