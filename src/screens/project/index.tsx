import { Link, Route, Routes, Navigate } from "react-router-dom";
import { KanbanScreen } from "screens/kanban";
import { TaskGroupScreen } from "screens/task-group";

export const ProjectScreen = () => {
  return (
    <div>
      <Link to={"kanban"}>看板</Link>
      <Link to={"taskGroup"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<KanbanScreen />} />
        <Route path={"taskGroup"} element={<TaskGroupScreen />} />
        <Route
          path={"/"}
          element={
            <Navigate
              to={`${window.location.pathname}/kanban`}
              replace={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
