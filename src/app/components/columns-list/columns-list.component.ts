import {Component, Input, OnInit} from '@angular/core';
import {Column} from "../../models/column.model";
import {Store} from "@ngrx/store";
import * as reducer from "../../store/reducers/pma.reducer";


@Component({
  selector: 'columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss']
})
export class ColumnsListComponent implements OnInit {
  @Input() columnsList: Column[] | null = [];

  constructor(private store: Store<reducer.AppState>) { }

  ngOnInit(): void {
  }

}
