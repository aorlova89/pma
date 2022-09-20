import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import * as reducer from "./store/reducers/global.reducer";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project-management-application';
  isLoading$ = this.store.select(reducer.getIsLoading);

  constructor(private store: Store<reducer.AppState>) {

  }

}
