import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

import {KanbanService} from "../../services/kanban.service";
import * as reducer from "../../store/reducers/pma.reducer";
import * as AppActions from "../../store/actions/pma.actions";
import {AddColumnDialogComponent} from "../../components/add-column-dialog/add-column-dialog.component";
import {Board} from "../../models/board.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Column} from "../../models/column.model";


@Component({
  selector: 'board-details-page',
  templateUrl: './board-details-page.component.html',
  styleUrls: ['./board-details-page.component.scss']
})
export class BoardDetailsPageComponent implements OnInit {
  boardName = '';
  boardId = '';
  columnsList$ = this.store.select(reducer.getColumns);
  columns: Column[] = [];

  constructor(private store: Store<reducer.AppState>,
              private kanbanService: KanbanService,
              private router: Router,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.boardId = params['board']);
    this.store.dispatch(AppActions.loadColumns({boardId: this.boardId}));

    this.kanbanService.getBoardById(this.boardId)
      .pipe(first())
      .subscribe((resp:Board) => this.boardName = resp.title,
        error => {
          this.snackBar.open(error.toString(), 'close',{
            duration: 5000,
            verticalPosition: 'top'
          });
        });

    this.columnsList$.subscribe(c => this.columns = c);
  }

  openAddColumnDialog() {
    const dialogRef = this.matDialog.open(AddColumnDialogComponent, {maxWidth: "400px"});

    dialogRef.beforeClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.store.dispatch(AppActions.addColumn({boardId: this.boardId, column: {title: dialogResult}}));
        }
      },
      error => {
        this.snackBar.open(error.toString(), 'close',{
          duration: 5000,
          verticalPosition: 'top'
        });
      });
  }

  drop(event: CdkDragDrop<Column[]>) {
    let cl:Column[] = [...this.columns]

    moveItemInArray(cl, event.previousIndex, event.currentIndex);

    this.columns = cl;

    this.columns.forEach((column, index) => {
        // console.log(column, index)
      this.store.dispatch(AppActions.updateColumn({
        boardId: this.boardId,
        columnId: column.id,
        column: {title: column.title, order: index + 1}
      }));
      }
    )

    // this.store.dispatch(AppActions.loadColumns({boardId: this.boardId}));
  }



}
