import { Component, OnInit } from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginValue: string = "";
  passwordValue: string = "";
  private token = "";

  constructor(private kanbanService: KanbanService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.kanbanService.signIn(this.loginValue, this.passwordValue).subscribe((res: any) => {
      this.token = res.token;
    });
    if (this.token) {
      this.localStorageService.setToken(this.token);
      this.router.navigate(['/boards']);
    }
  }

}

