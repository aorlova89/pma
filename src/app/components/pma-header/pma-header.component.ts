import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";


@Component({
  selector: 'pma-header',
  templateUrl: './pma-header.component.html',
  styleUrls: ['./pma-header.component.scss']
})
export class PmaHeaderComponent implements OnInit {
  tokenExists = this.localStorageService.getToken();
  loginValue = '';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    //todo
    this.tokenExists.subscribe(() => this.loginValue = this.localStorageService.getLoginValue());
  }

  logout() {
    this.localStorageService.clearToken();
  }

}
