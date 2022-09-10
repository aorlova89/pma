import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from "../../services/local-storage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../../components/modal/modal.component";
import {KanbanService} from "../../services/kanban.service";
import {map} from "rxjs";
import * as fromActions from "../../store/actions/pma.actions";

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  loginValue = this.localStorageService.getLoginValue();
  newPasswordValue = '';
  repeatedPasswordValue = '';

  constructor(private localStorageService: LocalStorageService, private matDialog: MatDialog, private kanbanService: KanbanService) { }

  ngOnInit(): void {
  }

  openConfirmationDialog() {
    /*
        const message = `Are you sure you want to delete board ${board.title}?`;
    const dialogData = new ConfirmDialogModel('Confirm Delete Board', message);
    const dialogRef = this.dialog.open(ModalComponent, {maxWidth: "400px", data: dialogData});

    dialogRef.beforeClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.store.dispatch(AppActions.deleteBoard({boardId: board.id}));
      }
    })
     */
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(ModalComponent, dialogConfig);
  }
  user = undefined;
  getUserId(login: any) {
    let users;
    this.kanbanService.getUsers().subscribe((res: any) => {
      console.log(res);
      this.user = res.filter((user:any) => user.login === login)[0];

    });
    // console.log(this.user)
    // @ts-ignore
    // return thi;
  }

  onSubmit() {
    this.getUserId(this.loginValue);
    console.log(this.user)
  }

}

