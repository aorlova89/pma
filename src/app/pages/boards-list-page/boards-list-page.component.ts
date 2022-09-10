import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

import * as reducer from "../../store/reducers/pma.reducer";
import * as AppActions from '../../store/actions/pma.actions';


@Component({
  selector: 'boards-list-page',
  templateUrl: './boards-list-page.component.html',
  styleUrls: ['./boards-list-page.component.scss']
})
export class BoardsListPageComponent implements OnInit {
  boardsList$ = this.store.select(reducer.getBoards);

  constructor(private store: Store<reducer.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadBoards());
  }

}
