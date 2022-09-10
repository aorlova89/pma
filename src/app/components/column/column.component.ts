import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogModel, ModalComponent} from "../modal/modal.component";
import {Task, TaskPayload} from "../../models/task.model";
import {Store} from "@ngrx/store";
import * as reducer from "../../store/reducers/pma.reducer";
import {KanbanService} from "../../services/kanban.service";
import * as AppActions from "../../store/actions/pma.actions";
import {AddTaskDialogComponent} from "../add-task-dialog/add-task-dialog.component";
import {Column} from "../../models/column.model";
import {ActivatedRoute, Params} from "@angular/router";


@Component({
  selector: 'column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column = {title: '', order: 0, id: ''};
  tasksList$ = this.store.select(reducer.getTasks);

  boardId = '';

  constructor(private dialog: MatDialog,
              private store: Store<reducer.AppState>,
              private kanbanService: KanbanService,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.boardId = params['board']);

    this.store.dispatch(AppActions.loadTasks({boardId: this.boardId, columnId: this.column.id}));
  }

  onAddTask() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {maxWidth: "400px", data : {dialogTitle: "Add Task"}});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(
          AppActions.addTask({boardId: this.boardId,
            columnId: this.column.id,
            //TODO userid
            task: {
              title: dialogResult.title,
              description: dialogResult.description,
              userId: 'ee70860e-d6e6-49d7-bba5-58d27f923eb8'}}));
      }
    })
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

  onTaskClick(task: Task) {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {maxWidth: "400px",
      data: {dialogTitle: "Edit Task", title: task.title, description: task.description}});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(
          AppActions.updateTask({boardId: this.boardId,
            columnId: this.column.id,
            taskId: task.id,
            //TODO userid
            task: {
              title: dialogResult.title,
              description: dialogResult.description,
              userId: 'ee70860e-d6e6-49d7-bba5-58d27f923eb8',
              order: task.order,
              boardId: this.boardId
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
}
