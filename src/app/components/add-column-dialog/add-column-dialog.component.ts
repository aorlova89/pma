import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
  styleUrls: ['./add-column-dialog.component.scss']
})
export class AddColumnDialogComponent implements OnInit {
  columnTitle = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: {title: string}) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    this.dialogRef.close(this.columnTitle.value);
  }

}
