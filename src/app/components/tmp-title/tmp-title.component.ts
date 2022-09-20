import {Component, ElementRef, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'tmp-title',
  templateUrl: './tmp-title.component.html',
  styleUrls: ['./tmp-title.component.scss']
})
export class TmpTitleComponent implements OnInit {
  title = 'Column';


  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }




  getElementClicked(event: any) {
    // console.log(`${event.target.id} clicked`);
  }

  // @HostListener('window:click', ['$event.target'])
  // public onColumnClick(targetElement: any) {
  //   console.log(targetElement.id)
  // }

}
