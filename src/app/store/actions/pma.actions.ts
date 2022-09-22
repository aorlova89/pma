import { createAction, props } from '@ngrx/store';
import { Board, BoardPayload } from '../../models/board.model';
import {Column, ColumnPayload} from "../../models/column.model";
import { Task, TaskPayload } from "../../models/task.model";
import {UserPayload} from "../../models/user";

// probably it's better to split actions into several files, according to corresponding pages logic

export const loadBoards = createAction('[Boards] Load');
export const loadBoardsSuccess = createAction('[Boards] Load Success', props<{ boards: Board[] }>());
export const loadBoardsFailed = createAction('[Boards] Load Failed', props<{ payload: {err: string} }>());

export const addBoard = createAction('[Boards] Add Board', props<{ board: BoardPayload }>());
export const addBoardSuccess = createAction('[Boards] Add Board Success', props<{ board: Board }>());
export const addBoardFailed = createAction('[Boards] Add Board Failed', props<{ payload: {err: string} }>());

export const deleteBoard = createAction('[Boards] Delete Board', props<{ boardId: string }>());
export const deleteBoardSuccess = createAction('[Boards] Delete Board Success', props<{ boardId: string }>());
export const deleteBoardFailed = createAction('[Boards] Delete Board Failed', props<{ payload: {err: string} }>());

export const loadColumns = createAction('[Columns] Load Columns', props<{boardId: string}>());
export const loadColumnsSuccess = createAction('[Columns] Load Columns Success', props<{boardId: string, columns: Column[]}>());
export const loadColumnsFailed = createAction('[Columns] Load Columns Failed', props<{ payload: {err: string} }>());

export const addColumn = createAction('[Columns] Add Column', props<{boardId: string, column: ColumnPayload}>());
export const addColumnSuccess = createAction('[Columns] Add Column Success', props<{column: Column}>());
export const addColumnFailed = createAction('[Columns] Add Column', props<{ payload: {err: string} }>());

export const deleteColumn = createAction('[Columns] Delete Column', props<{boardId: string, columnId: string}>());
export const deleteColumnSuccess = createAction('[Columns] Delete Column Success', props<{columnId: string}>());
export const deleteColumnFailed = createAction('[Columns] Delete Column Failed', props<{ payload: {err: string} }>());

export const updateColumn = createAction('[Columns] Update Column', props<{boardId: string, columnId: string, column: ColumnPayload}>());
export const updateColumnSuccess = createAction('[Columns] Update Column Success', props<{column: Column}>());
export const updateColumnFailed = createAction('[Columns] Update Column Failed', props<{ payload: {err: string} }>());

export const loadTasks = createAction('[Tasks] Load Tasks', props<{boardId: string, columnId: string}>());
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailed = createAction('[Tasks] Load Tasks Failed', props<{ payload: {err: string} }>());

export const addTask = createAction('[Tasks] Add Task', props<{boardId: string, columnId: string, task: TaskPayload}>());
export const addTaskSuccess = createAction('[Tasks] Add Task Success', props<{task: Task}>());
export const addTaskFailed = createAction('[Tasks] Add Task Failed', props<{ payload: {err: string} }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{boardId: string, columnId: string, taskId: string}>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{taskId: string}>());
export const deleteTaskFailed = createAction('[Tasks] Delete Task Failed', props<{ payload: {err: string} }>());

export const updateTask = createAction('[Tasks] Update Task', props<{boardId: string, columnId: string, taskId: string, task: TaskPayload}>());
export const updateTaskSuccess = createAction('[Tasks] Update Task Success', props<{task: Task}>());
export const updateTaskFailed = createAction('[Tasks] Update Task Failed', props<{ payload: {err: string} }>());

export const updateUser = createAction('[User] Update User', props<{userId: string, user: UserPayload}>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{user: UserPayload}>());
export const updateUserFailed = createAction('[User] Update User Failed', props<{ payload: {err: string} }>());
