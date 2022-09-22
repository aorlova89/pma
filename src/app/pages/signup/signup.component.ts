import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {first} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

import {KanbanService} from "../../services/kanban.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserPayload} from "../../models/user";
import * as globalActions from "../../store/actions/global.actions";
import * as fromRoot from "../../store/reducers/global.reducer";


@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any = FormControl;

  loading = false;
  submitted = false;

  constructor(private kanbanService: KanbanService,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<fromRoot.AppState>) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    this.store.dispatch(globalActions.setLoadingState({ isLoading: true }));

    this.kanbanService.signUp({
      name: this.signupForm.controls.name.value,
      login: this.signupForm.controls.login.value,
      password: this.signupForm.controls.password.value
    })
      .pipe(first())
      .subscribe((res: UserPayload) => {
          this.snackBar.open('Registration is completed, please login', 'close',{
            duration: 5000,
            verticalPosition: 'top'
          });
          this.router.navigate(['/login']);
          this.store.dispatch(globalActions.setLoadingState({ isLoading: false }));
        },
        error => {
          this.snackBar.open(error.toString(), 'close',{
            duration: 5000,
            verticalPosition: 'top'
          });
          this.store.dispatch(globalActions.setLoadingState({ isLoading: false }));
        });
  }

}
