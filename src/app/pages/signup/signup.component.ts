import { Component, OnInit } from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  nameValue: string = "";
  loginValue: string = "";
  passwordValue: string = "";
  private token = "";

  constructor(private kanbanService: KanbanService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.kanbanService.signUp({name: this.nameValue, login: this.loginValue, password: this.passwordValue})
      .subscribe((res: any) => {
      this.token = res.token;
    });
    if (this.token) {
      console.log(this.token)
      localStorage.setItem("token", this.token);
      this.router.navigate(['/boards']);
    }
  }

}
