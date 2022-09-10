export interface Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: [];
}

export interface TaskPayload {
  title: string;
  description: string;
  userId: string;
  order?: number;
  boardId?: string;
}
