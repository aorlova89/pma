import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

import {ConfirmDialogModel, ModalComponent} from "../modal/modal.component";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
import {Task} from "../../models/task.model";
import {Column} from "../../models/column.model";
import {AuthenticationService} from "../../services/authentication.service";
import {KanbanService} from "../../services/kanban.service";
import * as reducer from "../../store/reducers/pma.reducer";
import * as AppActions from "../../store/actions/pma.actions";


@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() editable: boolean = false;
  @Input() column: Column = {title: '', order: 0, id: ''};
  @Input() columnTitle = '';
  updatedColumnTitle = '';
  columnsList$ = this.store.select(reducer.getColumns);
  columnIds: string[] = [];

  tasksList$ = this.store.select(reducer.getTasks);

  tasks: Task[] = [];
  boardId = '';
  currentLogin = '';
  currentUserId = '';

  constructor(private dialog: MatDialog,
              private store: Store<reducer.AppState>,
              private kanbanService: KanbanService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
  ) {
    this.currentLogin = this.authenticationService.currentUserLogin;
    this.currentUserId = this.authenticationService.currentUserId;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.boardId = params['board']);
    this.store.dispatch(AppActions.loadTasks({boardId: this.boardId, columnId: this.column.id}));
    this.columnTitle = this.column.title;
    this.tasksList$.subscribe(t => this.tasks = t.filter(task => task.columnId === this.column.id))
    this.columnsList$.subscribe(c => this.columnIds = c.map(item => item.id))
  }

  handleColumnTitleClick(event: any) {
    if (event.target.classList.contains('input')) {
      if (!this.editable) {
        this.editable = true;
      }
    } else if (event.target.id === 'save-update') {
      if (this.columnTitle !== this.column.title)  {
        this.store.dispatch(AppActions.updateColumn({
          boardId: this.boardId,
          columnId: this.column.id,
          column: {title: this.columnTitle, order: this.column.order}
        }));
        this.updatedColumnTitle = this.columnTitle;
      }
      if (this.editable) {
        this.editable = false;
      }
    } else {
      if (this.updatedColumnTitle && this.columnTitle !== this.updatedColumnTitle) {
        this.columnTitle = this.updatedColumnTitle;
      }
      if (this.editable) {
        this.editable = false;
      }
    }
  }

  onDeleteColumn(column: Column) {
    const message = `Are you sure you want to delete column ${column.title}?`;
    const dialogData = new ConfirmDialogModel('Confirm Delete Column', message);
    const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});
    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(AppActions.deleteColumn({boardId: this.boardId, columnId: column.id}));
      }
    })
  }

  onAddTask() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {maxWidth: "400px", data : {dialogTitle: "Add Task"}});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(
          AppActions.addTask({
            boardId: this.boardId,
            columnId: this.column.id,
            task: {
              title: dialogResult.title,
              description: dialogResult.description,
              userId: this.currentUserId
            }
          }));
      }
    })
  }

  onTaskClick(task: Task) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {maxWidth: "400px",
      data: {dialogTitle: "Edit Task", title: task.title, description: task.description}});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(
          AppActions.updateTask({
            boardId: this.boardId,
            columnId: this.column.id,
            taskId: task.id,
            task: {
              title: dialogResult.title,
              description: dialogResult.description,
              userId: this.currentUserId,
              order: task.order,
              boardId: this.boardId,
              columnId: this.column.id
            }}));
      }
    })

  }

  onDeleteTask(event: Event, task: Task) {
    event.stopPropagation();
    const message = `Are you sure you want to delete task ${task.title}?`;
    const dialogData = new ConfirmDialogModel('Confirm Delete Task', message);
    const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});
    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(AppActions.deleteTask({boardId: this.boardId, columnId: this.column.id, taskId: task.id}));
      }
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.tasks.forEach((task, index) => {
          this.store.dispatch(
            AppActions.updateTask({
              boardId: this.boardId,
              columnId: this.column.id,
              taskId: task.id,
              task: {
                title: task.title,
                description: task.description,
                userId: this.currentUserId,
                order: index + 1,
                boardId: this.boardId,
                columnId: this.column.id
              }
            }))
        }
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const movedTask:Task = event.container.data[event.currentIndex];

      // destination container: add task 'moved' from src container
      this.store.dispatch(
        AppActions.addTask({
          boardId: this.boardId,
          columnId: event.container.id,
          task: {
            title: movedTask.title,
            description: movedTask.description,
            userId: this.currentUserId,
          }
        })
      );
      // delete moved task from src container
      this.store.dispatch(
        AppActions.deleteTask({
          boardId: this.boardId,
          columnId: movedTask.columnId,
          taskId: movedTask.id
        })
      )
      // destination container: update order for existing tasks
      event.container.data.forEach((task ,index) => {
        AppActions.updateTask({
          boardId: this.boardId,
          columnId: event.container.id,
          taskId: task.id,
          task: {
            title: task.title,
            description: task.description,
            userId: this.currentUserId,
            order: index + 1,
            boardId: this.boardId,
            columnId: event.container.id
          }
        })
      })
      // src container: update order of tasks after drag action
      event.previousContainer.data.forEach((task, index) => {
        AppActions.updateTask({
          boardId: this.boardId,
          columnId: this.column.id,
          taskId: task.id,
          task: {
            title: task.title,
            description: task.description,
            userId: this.currentUserId,
            order: index + 1,
            boardId: this.boardId,
            columnId: this.column.id
          }
        })
      })
    }
  }

}
