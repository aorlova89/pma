import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";

import * as pmaActions from '../actions/pma.actions';
import { Board } from "../../models/board.model";
import { Column } from "../../models/column.model";
import { Task } from "../../models/task.model";


export interface AppState {
  boards: Board[];
  columns: Column[];
  currentBoardId: string;
  tasks: Task[];
}

export const initialState: AppState = { boards: [], columns: [], currentBoardId: '', tasks: [] }

export const appReducer = createReducer(
  initialState,
  on(pmaActions.loadBoardsSuccess, (state, { boards }) => ({
      ...state,
      boards: boards
    })
  ),
  on(pmaActions.addBoardSuccess, (state, { board }) => ({
      ...state,
      boards: [...state.boards, board]
    })
  ),
  on(pmaActions.deleteBoardSuccess, (state, { boardId }) => ({
      ...state,
      boards: state.boards.filter(el => el.id !== boardId)
    })
  ),
  on(pmaActions.loadColumnsSuccess, (state, {boardId, columns}) => ({
      ...state,
      columns: [...columns].sort((a, b) => a.order - b.order),
      currentBoardId: boardId
    })
  ),
  on(pmaActions.addColumnSuccess, (state, {column}) => ({
      ...state,
      columns: [...state.columns, column]
    })
  ),
  on(pmaActions.deleteColumnSuccess, (state, { columnId }) => ({
      ...state,
      columns: state.columns.filter(el => el.id !== columnId)
    })
  ),
  on(pmaActions.updateColumnSuccess, (state, { column }) => ({
      ...state,
      column: state.columns
        .map(el => el.id === column.id ? column : el)
        .sort((a, b) => a.order - b.order)
    })
  ),
  on(pmaActions.loadTasksSuccess, (state, { tasks }) => ({
      ...state,
      tasks: [...state.tasks, ...tasks].sort((a, b) => a.order - b.order)
    })
  ),
  on(pmaActions.addTaskSuccess, (state, { task }) => ({
      ...state,
      tasks: [...state.tasks, task]
    })
  ),
  on(pmaActions.deleteTaskSuccess, (state, { taskId }) => ({
      ...state,
      tasks: state.tasks.filter(el => el.id !== taskId)
    })
  ),
  on(pmaActions.updateTaskSuccess, (state, { task }) => ({
      ...state,
      tasks: state.tasks
        .map(el => el.id === task.id ? task : el)
        .sort((a, b) => a.order - b.order)
    })
  )
);

export const getAppState = createFeatureSelector<AppState>('pma');

export const getBoards = createSelector(
  getAppState,
  (state: AppState) => state.boards
);

export const getColumns = createSelector(
  getAppState,
  (state: AppState) => state.columns
);

export const getBoardTitle = createSelector(
  getAppState,
  (state: AppState) => {
    return state.boards.find(board => board.id === state.currentBoardId)?.title}
);

export const getTasks = createSelector(
  getAppState,
  (state: AppState) => state.tasks
);
