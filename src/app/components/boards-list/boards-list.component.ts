import {Component, Input, OnInit} from '@angular/core';
import {Board, BoardPayload} from "../../models/board.model";
import * as AppActions from "../../store/actions/pma.actions";
import {Store} from "@ngrx/store";
import * as reducer from "../../store/reducers/pma.reducer";

@Component({
  selector: 'boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit {
  @Input() boardsList: Board[] | null = [];

  constructor(private store: Store<reducer.AppState>) { }

  ngOnInit(): void {
  }

  onAddBoard(board: BoardPayload) {
    this.store.dispatch(AppActions.addBoard({board}));
  }

}
