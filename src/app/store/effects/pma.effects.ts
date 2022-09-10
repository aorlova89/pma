import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppState} from "../reducers/pma.reducer";
import * as fromActions from "../actions/pma.actions";
import {Injectable} from "@angular/core";
import {KanbanService} from "../../services/kanban.service";
import { catchError, finalize, map, of, switchMap, switchMapTo, tap } from 'rxjs';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private kanbanService: KanbanService,
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadBoards),
      switchMapTo(
        this.kanbanService.getBoards()
          .pipe(
            map(boards => fromActions.loadBoardsSuccess({boards})),
            catchError(() => of(fromActions.loadBoardsFailed()))
          )
      )
    )
  );

  addBoard$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.addBoard),
      switchMap(({board}) =>
        this.kanbanService.createBoard(board)
          .pipe(
            map(board => fromActions.addBoardSuccess({board})),
            catchError(() => of(fromActions.addBoardFailed()))
          )
      )
    ));

  deleteBoard$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteBoard),
      switchMap(({boardId}) =>
        this.kanbanService.deleteBoard(boardId)
          .pipe(
            map(boards => fromActions.deleteBoardSuccess({boardId})),
            catchError(() => of(fromActions.deleteBoardFailed()))
          )
      )
    ));

  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadColumns),
      switchMap(({boardId}) =>
        this.kanbanService.getColumns(boardId)
          .pipe(
            map(columns => fromActions.loadColumnsSuccess({boardId, columns})),
            catchError(() => of(fromActions.loadColumnsFailed()))
          )
      )
    )
  );

  deleteColumn$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteColumn),
      switchMap(({boardId, columnId}) =>
        this.kanbanService.deleteColumn(boardId, columnId)
          .pipe(
            map(boards => fromActions.deleteColumnSuccess({columnId})),
            catchError(() => of(fromActions.deleteColumnFailed()))
          )
      )
    ));

  addColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addColumn),
      switchMap(({boardId, column}) =>
        this.kanbanService.createColumn(boardId, column)
          .pipe(
            map(column => fromActions.addColumnSuccess({column})),
            catchError(() => of(fromActions.addColumnFailed()))
          )
      )
    )
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadTasks),
      switchMap(({boardId, columnId}) =>
        this.kanbanService.getTasks(boardId, columnId)
          .pipe(
            map(tasks => fromActions.loadTasksSuccess({tasks})),
            catchError(() => of(fromActions.loadTasksFailed()))
          )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addTask),
      switchMap(({boardId, columnId, task}) =>
        this.kanbanService.addTask(boardId, columnId, task)
          .pipe(
            map(task => fromActions.addTaskSuccess({task})),
            catchError(() => of(fromActions.addTaskFailed()))
          )
      )
    )
  );

  deleteTask$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteTask),
      switchMap(({boardId, columnId, taskId}) =>
        this.kanbanService.deleteTask(boardId, columnId, taskId)
          .pipe(
            map(boards => fromActions.deleteTaskSuccess({taskId})),
            catchError(() => of(fromActions.deleteTaskFailed()))
          )
      )
    ));

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateTask),
      switchMap(({boardId, columnId, taskId, task}) =>
        this.kanbanService.editTask(boardId, columnId, taskId, task)
          .pipe(
            map(task => fromActions.updateTaskSuccess({task})),
            catchError(() => of(fromActions.updateTaskFailed()))
          )
      )
    )
  );

}

