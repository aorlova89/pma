import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

import {BoardPayload} from "../../models/board.model";


@Component({
  selector: 'add-board-card',
  templateUrl: './add-board-card.component.html',
  styleUrls: ['./add-board-card.component.scss']
})
export class AddBoardCardComponent implements OnInit {
  newBoardTitle = new FormControl('', []);

  @Output() addBoard = new EventEmitter<BoardPayload>();
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.newBoardTitle.value) {
      this.addBoard.emit({
        title: this.newBoardTitle.value,
        description: `${this.newBoardTitle.value} description`
      });
      this.newBoardTitle.reset();
    }
  }

}
