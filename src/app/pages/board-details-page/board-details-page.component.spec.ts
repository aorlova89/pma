import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDetailsPageComponent } from './board-details-page.component';

describe('BoardDetailsComponent', () => {
  let component: BoardDetailsPageComponent;
  let fixture: ComponentFixture<BoardDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
