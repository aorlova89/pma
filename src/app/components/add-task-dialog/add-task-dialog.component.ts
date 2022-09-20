import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})
export class AddTaskDialogComponent implements OnInit {
  taskTitle = new FormControl('', [Validators.required]);
  taskDescription = new FormControl('', [Validators.required]);
  dialogTitle = '';
  title = '';
  description = '';

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {dialogTitle: string, title: string, description: string}) {
    this.dialogTitle = data.dialogTitle;
    this.taskTitle.setValue(data.title);
    this.taskDescription.setValue(data.description);
    // this.title = data.title;
    // this.description = data.description;
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close({title: this.taskTitle.value, description: this.taskDescription.value});
  }

}
