import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Column} from "../../models/column.model";
import {KanbanService} from "../../services/kanban.service";
import * as reducer from "../../store/reducers/pma.reducer";
import {Store} from "@ngrx/store";
import * as AppActions from "../../store/actions/pma.actions";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../../components/modal/modal.component";
import {DialogInterface} from "../../models/dialog.model";
import {AddColumnDialogComponent} from "../../components/add-column-dialog/add-column-dialog.component";

@Component({
  selector: 'board-details-page',
  templateUrl: './board-details-page.component.html',
  styleUrls: ['./board-details-page.component.scss']
})
export class BoardDetailsPageComponent implements OnInit {
  boardName = this.store.select(reducer.getBoardTitle);
  boardId = '';
  columnsList$ = this.store.select(reducer.getColumns);

  constructor(private store: Store<reducer.AppState>,
              private kanbanService: KanbanService,
              private router: Router,
              private route: ActivatedRoute,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.boardId = params['board']);
    this.store.dispatch(AppActions.loadColumns({boardId: this.boardId}));
  }

  openAddColumnDialog() {
    const dialogRef = this.matDialog.open(AddColumnDialogComponent, {maxWidth: "400px"});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(AppActions.addColumn({boardId: this.boardId, column: {title: dialogResult}}));
      }
    })
  }

}


