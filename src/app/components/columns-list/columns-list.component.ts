import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as reducer from "../../store/reducers/pma.reducer";

import {Column} from "../../models/column.model";


@Component({
  selector: 'columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss']
})
export class ColumnsListComponent implements OnInit {
  @Input() columnsList: Column[] | null = [];

  constructor(private store: Store<reducer.AppState>) {
    this.store.select(reducer.getColumns).subscribe(res =>  this.columnsList = res);
  }

  ngOnInit(): void {
  }
}
