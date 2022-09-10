import {Board} from "../../models/board.model";
import * as pmaActions from '../actions/pma.actions';
import {createFeatureSelector, createReducer, createSelector, on} from "@ngrx/store";
import {addBoard} from "../actions/pma.actions";
import {Column} from "../../models/column.model";
import {state} from "@angular/animations";
import {Task} from "../../models/task.model";


export interface AppState {
  boards: Board[];
  columns: Column[];
  currentBoardId: string | undefined;
  tasks: Task[];
  // modal: {isOpened: boolean, type?: Modals}
}

export const initialState: AppState = {
  boards: [], columns: [], currentBoardId: '', tasks: []
  // modal: {isOpened: false}
}

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
      columns: columns,
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
  on(pmaActions.loadTasksSuccess, (state, { tasks }) => ({
      ...state,
      tasks: tasks
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
    //todo doesn't work
      tasks: [...state.tasks, state.tasks[Number(task.id)] = task]
    })
  ),
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
  (state: AppState) => state.boards.find(board => board.id === state.currentBoardId)?.title
);

export const getTasks = createSelector(
  getAppState,
  (state: AppState) => state.tasks
);

export const getCurrentBoardId = createSelector(
  getAppState,
  (state: AppState) => state.currentBoardId
);
