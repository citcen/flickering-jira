export interface Task {
  id: number;
  name: string;
  processorId: number; // 经办人
  projectId: number;
  groupId: number; // 任务组
  kanbanId: number;
  typeId: number; // bug or task
  note: string;
}

export interface TaskType {
  id: number;
  name: string;
}
