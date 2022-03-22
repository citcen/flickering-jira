// src/mocks/handlers.js
import { rest } from "msw";
import { getToken } from "auth-provider";
import { nanoid } from "nanoid";
import {
  defaultProjectData,
  defaultTasksData,
  kanbansData,
  ProjectsDataType,
  projectsData,
  tasksData,
  taskTypesData,
  usersData,
  TaskDataType,
  KanbansDataType,
  taskGroupData,
} from "./datas";
import qs from "qs";
import { insertAfter, insertBefore } from "utils/reorder";
const baseUrl = process.env.REACT_APP_API_URL;

// 将初始化数据存入 window.localStorage
window.localStorage.getItem("projectsData") ||
  window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
window.localStorage.getItem("kanbansData") ||
  window.localStorage.setItem("kanbansData", JSON.stringify(kanbansData));
window.localStorage.getItem("tasksData") ||
  window.localStorage.setItem("tasksData", JSON.stringify(tasksData));
window.localStorage.getItem("taskGroupData") ||
  window.localStorage.setItem("taskGroupData", JSON.stringify(taskGroupData));

export const handlers = [
  rest.post(`${baseUrl}/login`, (req, res, ctx) => {
    const reqBody: any = req.body;
    if (reqBody.username === "1") {
      return res(
        ctx.status(400),
        ctx.json({
          message: "用户名或密码错误",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: nanoid(),
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),

  rest.post(`${baseUrl}/register`, (req, res, ctx) => {
    const reqBody: any = req.body;
    if (reqBody.username === "111") {
      return res(
        ctx.status(400),
        ctx.json({
          message: "用户名已注册",
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: nanoid(),
          name: (req.body as any).username,
          token: req.id,
        },
      })
    );
  }),
];

export const authHandlers = [
  // 用户
  rest.get(`${baseUrl}/users?`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(usersData));
  }),
  // 修改 project
  rest.patch(`${baseUrl}/projects/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;
    if (req.params?.id) {
      let projectsData = JSON.parse(
        window.localStorage.getItem("projectsData") || ""
      );
      let newData: any = [];
      projectsData.map((item: ProjectsDataType) => {
        if (String(item.id) === req.params.id) {
          newData.push({ ...item, ...data });
        } else newData.push({ ...item });
      });
      const projectData = [
        projectsData.find(
          (item: ProjectsDataType) => String(item.id) === req.params?.id
        ),
      ];
      window.localStorage.setItem("projectsData", JSON.stringify(newData));
      return res(ctx.status(200), ctx.json(projectData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 查询 project
  rest.get(`${baseUrl}/projects/:personId/:name`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { personId, name } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    if (personId !== "all") {
      projectsData = [
        projectsData.find(
          (item: ProjectsDataType) => String(item.personId) === personId
        ),
      ];
    }
    if (name !== "all") {
      projectsData = projectsData.filter(
        (item: ProjectsDataType) => item.name.indexOf(name as string) > -1
      );
      /*projectsData = [
        projectsData.find(
          (item: ProjectsDataType) => String(item.name) === name
        ),
      ];*/
    }
    if (projectsData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(projectsData));
    }
    return res(ctx.status(200), ctx.json([]));
  }),
  // 查询 project 详情
  rest.get(`${baseUrl}/projectDetail/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    projectsData = [
      projectsData.find((item: ProjectsDataType) => String(item.id) === id),
    ];
    if (projectsData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(projectsData[0]));
    }
    return res(ctx.status(200), ctx.json({}));
  }),
  // 添加 project
  rest.post(`${baseUrl}/projects`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let projectsData = JSON.parse(
        window.localStorage.getItem("projectsData") || ""
      );
      projectsData.push({ id: nanoid(), ...defaultProjectData, ...data });

      window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
      return res(ctx.status(200), ctx.json(projectsData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 删除 project
  rest.delete(`${baseUrl}/projects/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let projectsData = JSON.parse(
      window.localStorage.getItem("projectsData") || ""
    );
    projectsData = projectsData.filter(
      (item: ProjectsDataType) => String(item.id) !== id
    );
    if (projectsData) {
      window.localStorage.setItem("projectsData", JSON.stringify(projectsData));
      return res(
        ctx.status(200),
        ctx.json({
          message: "删除成功",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "删除失败",
        })
      );
    }
  }),
  // 查询看板
  rest.get(`${baseUrl}/kanbans`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const kanbansData = JSON.parse(
      window.localStorage.getItem("kanbansData") || ""
    );
    return res(ctx.status(200), ctx.json(kanbansData));
  }),
  // 删除看板
  rest.delete(`${baseUrl}/kanbans/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let kanbansData = JSON.parse(
      window.localStorage.getItem("kanbansData") || ""
    );
    kanbansData = kanbansData.filter(
      (item: KanbansDataType) => String(item.id) !== id
    );
    if (kanbansData) {
      window.localStorage.setItem("kanbansData", JSON.stringify(kanbansData));
      return res(
        ctx.status(200),
        ctx.json({
          message: "删除成功",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "删除失败",
        })
      );
    }
  }),
  // 查询看板任务
  rest.get(`${baseUrl}/tasks/:params`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }

    const tasksData = JSON.parse(
      window.localStorage.getItem("tasksData") || ""
    );
    const { params } = req.params;
    const objParams = qs.parse(params as string);

    let searchData = tasksData;

    if (objParams?.name) {
      searchData = searchData.filter(
        (item: TaskDataType) =>
          item.name.indexOf(objParams?.name as string) > -1
      );
    }
    if (objParams?.typeId) {
      searchData = searchData.filter(
        (item: TaskDataType) => String(item.typeId) === objParams.typeId
      );
    }
    if (objParams?.processorId) {
      searchData = searchData.filter(
        (item: TaskDataType) =>
          String(item.processorId) === objParams.processorId
      );
    }
    /*for (let key in objParams) {
    searchData = (key === "name") ? (searchData.filter((item: any) => (item[key]).indexOf(objParams[key] as string) > -1)) : (searchData.filter((item: any) => String(item[key]) === objParams[key]))
    }*/
    return res(ctx.status(200), ctx.json(searchData));
  }),
  // 查询看板任务type
  rest.get(`${baseUrl}/taskTypes`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    return res(ctx.status(200), ctx.json(taskTypesData));
  }),
  // 添加看板
  rest.post(`${baseUrl}/kanbans`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let kanbansData = JSON.parse(
        window.localStorage.getItem("kanbansData") || ""
      );
      kanbansData.push({ id: nanoid(), ...data });

      window.localStorage.setItem("kanbansData", JSON.stringify(kanbansData));
      return res(ctx.status(200), ctx.json(kanbansData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 添加任务
  rest.post(`${baseUrl}/tasks`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let tasksData = JSON.parse(
        window.localStorage.getItem("tasksData") || ""
      );
      tasksData.push({ id: nanoid(), ...defaultTasksData, ...data });

      window.localStorage.setItem("tasksData", JSON.stringify(tasksData));
      return res(ctx.status(200), ctx.json(tasksData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 查询 task 详情
  rest.get(`${baseUrl}/taskDetail/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let tasksData = JSON.parse(window.localStorage.getItem("tasksData") || "");
    tasksData = [
      tasksData.find((item: TaskDataType) => String(item.id) === id),
    ];
    if (tasksData[0] !== undefined) {
      return res(ctx.status(200), ctx.json(tasksData[0]));
    }
    return res(ctx.status(200), ctx.json({}));
  }),
  // 修改 task
  rest.patch(`${baseUrl}/tasks/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;
    if (req.params?.id) {
      let tasksData = JSON.parse(
        window.localStorage.getItem("tasksData") || ""
      );
      let newData: any = [];
      tasksData.map((item: TaskDataType) => {
        if (String(item.id) === req.params.id) {
          newData.push({ ...item, ...data });
        } else newData.push({ ...item });
      });
      const taskData = [
        tasksData.find(
          (item: TaskDataType) => String(item.id) === req.params?.id
        ),
      ];
      window.localStorage.setItem("tasksData", JSON.stringify(newData));
      return res(ctx.status(200), ctx.json(taskData));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
  // 删除看板
  rest.delete(`${baseUrl}/tasks/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let tasksData = JSON.parse(window.localStorage.getItem("tasksData") || "");
    tasksData = tasksData.filter(
      (item: TaskDataType) => String(item.id) !== id
    );
    if (tasksData) {
      window.localStorage.setItem("tasksData", JSON.stringify(tasksData));
      return res(
        ctx.status(200),
        ctx.json({
          message: "删除成功",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "删除失败",
        })
      );
    }
  }),
  // 看板排序
  rest.post(`${baseUrl}/kanbans/reorder`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;
    const fromId = data.fromId,
      type = data.type,
      referenceId = data.referenceId;
    const kanbansData = JSON.parse(
      window.localStorage.getItem("kanbansData") || ""
    );

    const movingItemIndex = kanbansData.findIndex(function (
      item: KanbansDataType
    ) {
      return item.id === fromId;
    });

    if (!referenceId) {
      const data = insertAfter(
        kanbansData,
        movingItemIndex,
        kanbansData.length - 1
      );
      window.localStorage.setItem("kanbansData", JSON.stringify(data));
      return res(
        ctx.status(200),
        ctx.json({
          message: "操作成功",
        })
      );
    }

    const targetIndex = kanbansData.findIndex(function (item: KanbansDataType) {
      return item.id === referenceId;
    });
    const insert = type === "after" ? insertAfter : insertBefore;
    const newData = insert(kanbansData, movingItemIndex, targetIndex);
    window.localStorage.setItem("kanbansData", JSON.stringify(newData));

    return res(
      ctx.status(200),
      ctx.json({
        message: "操作成功",
      })
    );
  }),
  // task排序
  rest.post(`${baseUrl}/tasks/reorder`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;
    const fromId = data.fromId,
      type = data.type,
      referenceId = data.referenceId,
      fromKanbanId = data.fromKanbanId,
      toKanbanId = data.toKanbanId;
    const tasksData = JSON.parse(
      window.localStorage.getItem("tasksData") || ""
    );

    const movingItemIndex = tasksData.findIndex(function (item: TaskDataType) {
      return item.id === fromId;
    });

    if (!referenceId) {
      const data = insertAfter(
        tasksData,
        movingItemIndex,
        tasksData.length - 1
      );
      if (fromKanbanId !== toKanbanId) {
        data.forEach((item: TaskDataType) => {
          if (
            item.id === fromId &&
            String(item.kanbanId) === String(fromKanbanId)
          ) {
            item.kanbanId = toKanbanId;
          }
        });
      }
      window.localStorage.setItem("tasksData", JSON.stringify(data));
      return res(
        ctx.status(200),
        ctx.json({
          message: "操作成功",
        })
      );
    }

    const targetIndex = tasksData.findIndex(function (item: TaskDataType) {
      return item.id === referenceId;
    });
    const insert = type === "after" ? insertAfter : insertBefore;
    const sortData = insert(tasksData, movingItemIndex, targetIndex);

    if (fromKanbanId !== toKanbanId) {
      sortData.forEach((item: TaskDataType) => {
        if (
          item.id === fromId &&
          String(item.kanbanId) === String(fromKanbanId)
        ) {
          item.kanbanId = toKanbanId;
        }
      });
    }

    window.localStorage.setItem("tasksData", JSON.stringify(sortData));

    return res(
      ctx.status(200),
      ctx.json({
        message: "操作成功",
      })
    );
  }),
  // 查询task-group
  rest.get(`${baseUrl}/taskGroup`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const taskGroupData = JSON.parse(
      window.localStorage.getItem("taskGroupData") || ""
    );
    return res(ctx.status(200), ctx.json(taskGroupData));
  }),
  // 删除task-group
  rest.delete(`${baseUrl}/taskGroup/:id`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const { id } = req.params;
    let taskGroupData = JSON.parse(
      window.localStorage.getItem("taskGroupData") || ""
    );
    taskGroupData = taskGroupData.filter((item: any) => String(item.id) !== id);
    if (taskGroupData) {
      window.localStorage.setItem(
        "taskGroupData",
        JSON.stringify(taskGroupData)
      );
      return res(
        ctx.status(200),
        ctx.json({
          message: "删除成功",
        })
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "删除失败",
        })
      );
    }
  }),
  // 添加看板
  rest.post(`${baseUrl}/taskGroup`, (req, res, ctx) => {
    if (!getToken()) {
      return res(
        ctx.status(401),
        ctx.json({
          message: "请重新登录",
        })
      );
    }
    const data = req.body as any;

    if (data) {
      let taskGroup = JSON.parse(
        window.localStorage.getItem("taskGroupData") || ""
      );
      taskGroup.push({ id: nanoid(), ...data });

      window.localStorage.setItem("taskGroupData", JSON.stringify(taskGroup));
      return res(ctx.status(200), ctx.json(taskGroup));
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: "操作失败",
        })
      );
    }
  }),
];
