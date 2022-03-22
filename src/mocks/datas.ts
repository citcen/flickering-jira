import { nanoid } from "nanoid";

// 用户
export const usersData = [
  {
    id: 1,
    name: "张三",
  },
  {
    id: 2,
    name: "李四",
  },
  {
    id: 3,
    name: "王五",
  },
  {
    id: 4,
    name: "赵六",
  },
];

// 项目
export const projectsData = [
  {
    id: 1,
    name: "骑手管理",
    personId: 1,
    organization: "外卖组",
    creationTime: 1600229787312,
    pin: false,
  },
  {
    id: 2,
    name: "团购APP",
    personId: 2,
    organization: "团购组",
    creationTime: 1600229787312,
    pin: false,
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 3,
    organization: "物料组",
    creationTime: 1594500007512,
    pin: true,
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 4,
    organization: "总部组",
    creationTime: 16055729750002,
    pin: true,
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "送餐组",
    creationTime: 16065729750002,
    pin: true,
  },
];
export const defaultProjectData = {
  name: "",
  personId: null,
  organization: "",
  creationTime: new Date().getTime(),
  pin: false,
};
export interface ProjectsDataType {
  id: string | number;
  name: string;
  personId: string;
  organization: string;
  creationTime?: number;
  pin: boolean;
}

// 看板
export const kanbansData = [
  {
    name: "待完成",
    id: 1,
  },
  {
    name: "开发中",
    id: 2,
  },
  {
    name: "已完成",
    id: 3,
  },
];
export interface KanbansDataType {
  id: string | number;
  name: string;
}
// 任务tasks
export const defaultTasksData = {
  name: undefined,
  tags: [1, 2],
  processorId: 1, // 经办人
  groupId: 1, // 任务组
  kanbanId: undefined,
  favorite: true,
  typeId: 1, // bug or task
  note: undefined,
};
export interface TaskDataType {
  id: number | string;
  name: string;
  tags: any[];
  processorId: number; // 经办人
  groupId: number; // 任务组
  kanbanId: number;
  favorite: boolean;
  typeId: number; // bug or task
  note: string;
}
export const tasksData = [
  {
    id: nanoid(),
    name: "管理注册界面开发",
    tags: [1, 2],
    reporterId: 1,
    processorId: 3,
    groupId: 1,
    kanbanId: 1,
    favorite: true,
    typeId: 2,
    note: "请尽快完成",
  },
  {
    id: nanoid(),
    name: "管理登录界面开发",
    tags: [2],
    reporterId: 1,
    processorId: 4,
    groupId: 1,
    kanbanId: 2,
    favorite: true,
    typeId: 2,
    note: "请使用JWT完成",
  },
  {
    id: nanoid(),
    name: "单元测试",
    tags: [1],
    reporterId: 1,
    processorId: 4,
    groupId: 3,
    kanbanId: 3,
    favorite: true,
    typeId: 1,
    note: "",
  },
  {
    id: nanoid(),
    name: "性能优化",
    tags: [1],
    reporterId: 1,
    processorId: 3,
    groupId: 3,
    kanbanId: 1,
    favorite: true,
    typeId: 2,
    note: "",
  },
  {
    id: nanoid(),
    name: "权限管理界面开发",
    tags: [1],
    reporterId: 1,
    processorId: 1,
    groupId: 2,
    kanbanId: 3,
    favorite: true,
    typeId: 2,
    note: "",
  },
  {
    id: nanoid(),
    name: "UI开发",
    tags: [1],
    reporterId: 1,
    processorId: 2,
    groupId: 2,
    kanbanId: 2,
    favorite: true,
    typeId: 2,
    note: "",
  },
  {
    id: nanoid(),
    name: "自测",
    tags: [1],
    reporterId: 1,
    processorId: 1,
    groupId: 2,
    kanbanId: 1,
    favorite: true,
    typeId: 1,
    note: "",
  },
];
// 任务taskType
export const taskTypesData = [
  {
    id: 1,
    name: "task",
  },
  {
    id: 2,
    name: "bug",
  },
];
// task-group
export const taskGroupData = [
  {
    end: 1620323200000,
    id: 1,
    name: "骑手物料表单开发",
    ownerId: 193359092,
    projectId: 1,
    start: 1617558400000,
  },
  {
    end: 1621260800000,
    id: 2,
    name: "骑手地图开发",
    ownerId: 193359092,
    projectId: 1,
    start: 1618409600000,
  },
  {
    end: 1613260800000,
    id: 3,
    name: "骑手最优路线开发",
    ownerId: 193359092,
    projectId: 1,
    start: 1610409600000,
  },
];
