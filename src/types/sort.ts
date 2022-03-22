export interface SortProps {
  // 要重新排序的 item
  fromId: number | string;
  // 目标位置的 item
  referenceId: number | string;
  // 放在目标位置的前还是后
  type: "before" | "after";
  fromKanbanId?: number | string;
  toKanbanId?: number | string;
}
