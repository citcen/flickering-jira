import { Link, Route, Routes, Navigate } from "react-router-dom";
import { SuperviseScreen } from "screens/supervise";
import { TaskGroupScreen } from "screens/task-group";

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={"supervise"}>看板</Link>
      <Link to={"taskGroup"}>任务组</Link>
      <Routes>
        <Route path={"supervise"} element={<SuperviseScreen />} />
        <Route path={"taskGroup"} element={<TaskGroupScreen />} />
        <Route
          path={"/"}
          element={<Navigate to={`${window.location.pathname}/supervise`} />}
        />
      </Routes>
    </div>
  );
};
