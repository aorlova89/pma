import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoardCardComponent } from './add-board-card.component';

describe('AddBoardCardComponent', () => {
  let component: AddBoardCardComponent;
  let fixture: ComponentFixture<AddBoardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoardCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
