import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>退出登录</button>
      <ProjectListScreen />
    </div>
  );
};
