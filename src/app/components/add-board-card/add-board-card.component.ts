import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BoardsListPageComponent} from "../../pages/boards-list-page/boards-list-page.component";
import {Board, BoardPayload} from "../../models/board.model";
import * as AppActions from "../../store/actions/pma.actions";
import {Store} from "@ngrx/store";
import * as reducer from "../../store/reducers/pma.reducer";

@Component({
  selector: 'add-board-card',
  templateUrl: './add-board-card.component.html',
  styleUrls: ['./add-board-card.component.scss']
})
export class AddBoardCardComponent implements OnInit {
  newBoardTitle = '';

  @Output() addBoard = new EventEmitter<BoardPayload>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addBoard.emit({
      title: this.newBoardTitle,
      description: `${this.newBoardTitle} description`
    });

    this.newBoardTitle = '';
  }

}
