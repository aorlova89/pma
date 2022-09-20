import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as fromActions from "../actions/pma.actions";
import * as globalActions from "../actions/global.actions";
import * as fromRoot from '../reducers/global.reducer';
import {Injectable} from "@angular/core";
import {KanbanService} from "../../services/kanban.service";
import {catchError, delay, finalize, map, mergeMap, of, switchMap, switchMapTo, tap} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";


@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private kanbanService: KanbanService,
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.AppState>,
  ) {}

  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadBoards),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMapTo(
        this.kanbanService.getBoards()
          .pipe(
            map(boards => fromActions.loadBoardsSuccess({boards})),
            //todo
            catchError((err) =>
              of(fromActions.loadBoardsFailed({payload: {err}})
              )
            ),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    )
  );

  addBoard$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.addBoard),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMap(({board}) =>
        this.kanbanService.createBoard(board)
          .pipe(
            map(board => fromActions.addBoardSuccess({board})),
            catchError((err) => of(fromActions.addBoardFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    ));

  deleteBoard$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteBoard),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMap(({boardId}) =>
        this.kanbanService.deleteBoard(boardId)
          .pipe(
            map(boards => fromActions.deleteBoardSuccess({boardId})),
            catchError((err) => of(fromActions.deleteBoardFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    ));

  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadColumns),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      mergeMap(({boardId}) =>
        this.kanbanService.getColumns(boardId)
          .pipe(
            map(columns => fromActions.loadColumnsSuccess({boardId, columns})),
            catchError((err) => of(fromActions.loadColumnsFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    )
  );

  deleteColumn$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteColumn),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMap(({boardId, columnId}) =>
        this.kanbanService.deleteColumn(boardId, columnId)
          .pipe(
            map(boards => fromActions.deleteColumnSuccess({columnId})),
            catchError((err) => of(fromActions.deleteColumnFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    ));

  updateColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateColumn),
      mergeMap(({boardId, columnId, column}) =>
        this.kanbanService.editColumn(boardId, columnId, column)
          .pipe(
            map(column => fromActions.updateColumnSuccess({column})),
            catchError((err) => of(fromActions.updateTaskFailed({payload: {err}})))
          )
      )
    )
  );

  addColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addColumn),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMap(({boardId, column}) =>
        this.kanbanService.createColumn(boardId, column)
          .pipe(
            map(column => fromActions.addColumnSuccess({column})),
            catchError((err) => of(fromActions.addColumnFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    )
  );

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadTasks),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      mergeMap(({boardId, columnId}) =>
        this.kanbanService.getTasks(boardId, columnId)
          .pipe(
            map(tasks => fromActions.loadTasksSuccess({tasks})),
            catchError((err) => of(fromActions.loadTasksFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.addTask),
      mergeMap(({boardId, columnId, task}) =>
        this.kanbanService.addTask(boardId, columnId, task)
          .pipe(
            map(task => fromActions.addTaskSuccess({task})),
            catchError((err) => of(fromActions.addTaskFailed({payload: {err}})))
          )
      )
    )
  );

  deleteTask$ = createEffect( () =>
    this.actions$.pipe(
      ofType(fromActions.deleteTask),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      mergeMap(({boardId, columnId, taskId}) =>
        this.kanbanService.deleteTask(boardId, columnId, taskId)
          .pipe(
            map(boards => fromActions.deleteTaskSuccess({taskId})),
            catchError((err) => of(fromActions.deleteTaskFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    ));

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateTask),
      mergeMap(({boardId, columnId, taskId, task}) =>
        this.kanbanService.editTask(boardId, columnId, taskId, task)
          .pipe(
            map(task => fromActions.updateTaskSuccess({task})),
            catchError((err) => of(fromActions.updateTaskFailed({payload: {err}})))
          )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.updateUser),
      delay(0),
      tap(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: true }))),
      switchMap(({userId, user}) =>
        this.kanbanService.updateUser(userId, user)
          .pipe(
            map(user => fromActions.updateUserSuccess({user})),
            catchError((err) => of(fromActions.updateUserFailed({payload: {err}}))),
            finalize(() => this.store.dispatch(globalActions.setLoadingState({ isLoading: false })))
          )
      )
    )
  );

  handleErrorMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadBoardsFailed,
        fromActions.addBoardFailed,
        fromActions.deleteBoardFailed,
        fromActions.loadColumnsFailed,
        fromActions.addColumnFailed,
        fromActions.deleteColumnFailed,
        fromActions.updateColumnFailed,
        fromActions.loadTasksFailed,
        fromActions.addTaskFailed,
        fromActions.deleteTaskFailed,
        fromActions.updateTaskFailed,
        fromActions.updateUserFailed,
      ),
      switchMap(({payload}) => {
        this.snackBar.open(payload.err, "close", { duration: 5000, verticalPosition: 'top' })
        return of({ type: 'noop' });
      })
    )
  );


}

