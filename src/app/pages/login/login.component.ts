import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";

import {AuthenticationService} from "../../services/authentication.service";
import * as globalActions from "../../store/actions/global.actions";
import * as fromRoot from "../../store/reducers/global.reducer";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormControl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.AppState>
  ) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['/boards']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(globalActions.setLoadingState({ isLoading: true }));

    this.authenticationService.login(this.loginForm.controls.login.value, this.loginForm.controls.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/boards']);
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
