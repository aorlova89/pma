import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";

import {ConfirmDialogModel, ModalComponent} from "../../components/modal/modal.component";
import {KanbanService} from "../../services/kanban.service";
import * as AppActions from "../../store/actions/pma.actions";
import * as reducer from "../../store/reducers/pma.reducer";
import {UserPayload} from "../../models/user";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm:any = FormControl;

  currentLogin = '';
  currentUserId = '';

  constructor(private authenticationService: AuthenticationService,
              private dialog: MatDialog,
              private store: Store<reducer.AppState>,
              private router: Router,
              private snackBar: MatSnackBar,
              private kanbanService: KanbanService,
              private formBuilder: FormBuilder,) {
    this.currentLogin = this.authenticationService.currentUserLogin;
    this.currentUserId = this.authenticationService.currentUserId;
  }

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      repeatedPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  openConfirmationDialog() {
    const message = `Are you sure you want to delete user profile of ${this.currentLogin}?`;
    const dialogData = new ConfirmDialogModel('Confirm Delete User', message);
    const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});
    dialogRef.beforeClosed().subscribe(dialogResult => {
        if (dialogResult) {
          this.kanbanService.deleteUser(this.currentUserId).subscribe((res: any) => {
            this.authenticationService.logout();
            this.router.navigate(['welcome']);
          });
        }
      },
      error => {
        this.snackBar.open(error.toString(), 'close',{
          duration: 5000,
          verticalPosition: 'top'
        });
      })
  }

  onSubmit() {
    let updatedUser: UserPayload = {
      'name': this.editProfileForm.controls.login.value, //this.loginForm.controls.login.value
      'login': this.editProfileForm.controls.login.value,
      'password': this.editProfileForm.controls.newPassword.value
    };
    if (this.editProfileForm.controls.repeatedPassword.value === this.editProfileForm.controls.newPassword.value) {
      //todo looks like store is not needed here
      this.store.dispatch(AppActions.updateUser({userId: this.currentUserId, user: updatedUser}));
      const message = `User Profile has been successfully updated`;
      const dialogData = new ConfirmDialogModel('User Updated', message);
      const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});
      dialogRef.beforeClosed().subscribe(dialogResult => {
        this.router.navigate(['/boards']);
      })
    }
    else {
      this.snackBar.open('Repeated Password is not the same', 'close', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }

  cancelEdit() {
    this.router.navigate(['/boards']);
  }

}
