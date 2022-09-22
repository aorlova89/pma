import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

import * as reducer from "../../store/reducers/pma.reducer";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'pma-header',
  templateUrl: './pma-header.component.html',
  styleUrls: ['./pma-header.component.scss']
})
export class PmaHeaderComponent implements OnInit {
  currentToken;
  currentLogin = '';

  constructor(private store: Store<reducer.AppState>,
              private authenticationService: AuthenticationService,
  ) {
    this.currentToken = this.authenticationService.currentToken;
  }

  ngOnInit(): void {
    this.currentToken.subscribe(() => {
      if (this.authenticationService.currentTokenValue) {
        this.currentLogin = this.authenticationService.currentUserLogin;
      }
    });
  }

  handleLogoutClick() {
    this.authenticationService.logout();
  }

}
