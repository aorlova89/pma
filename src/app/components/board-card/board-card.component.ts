import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";

import {Board} from "../../models/board.model";
import {ConfirmDialogModel, ModalComponent} from "../modal/modal.component";
import * as reducer from "../../store/reducers/pma.reducer";
import * as AppActions from "../../store/actions/pma.actions";


@Component({
  selector: 'board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() boardCard: Board = {title: '', description: '', id: ''};

  constructor(private store: Store<reducer.AppState>, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onDeleteBoard(event: Event, board: Board) {
    event.stopPropagation();
    const message = `Are you sure you want to delete board ${board.title}?`;
    const dialogData = new ConfirmDialogModel('Confirm Delete Board', message);
    const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(AppActions.deleteBoard({boardId: board.id}));
      }
    })
  }

  onBoardOpen(board: Board) {
    this.router.navigate([`/boards/`, board.id]);
  }

}
