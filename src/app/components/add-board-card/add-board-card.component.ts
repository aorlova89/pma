import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

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
    this.addBoard.emit({
      // todo
      title: this.newBoardTitle.value + '',
      description: `${this.newBoardTitle.value} description`
    });

    this.newBoardTitle.reset();
  }

}
