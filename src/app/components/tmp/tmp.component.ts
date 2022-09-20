import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'tmp',
  templateUrl: './tmp.component.html',
  styleUrls: ['./tmp.component.scss']
})
export class TmpComponent implements OnInit {
  title='Column';
  editModeOn = false;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  enableEditMode() {
    // console.log('edit mode enabled')
  }

  updateColumnTitle() {
    // console.log('new title saved')
  }

  disableEditMode() {
    // console.log('edit mode disabled')
  }

  onBlur() {
    // console.log('focus lost')
  }

  @HostListener('window:click', ['$event.target'])
  public onColumnClick(targetElement: any) {
    if (targetElement.id === 'input') {
      this.editModeOn = true;
      console.log('enable edit mode')
    } else if (targetElement.id === 'update-column-btn') {
      this.editModeOn = false;
      console.log('save updates')
    } else {
      //if (targetElement.id === 'cancel-update-btn') {
      this.editModeOn = false;
      console.log('cancel updates, disable edit mode')
    }
  }


}
