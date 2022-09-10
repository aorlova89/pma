import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
  dialogTitle = '';
  title = '';
  description = '';

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {dialogTitle: string, title: string, description: string}) {
    this.dialogTitle = data.dialogTitle;
    this.title = data.title;
    this.description = data.description;
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close({title: this.title, description: this.description});
  }

}
