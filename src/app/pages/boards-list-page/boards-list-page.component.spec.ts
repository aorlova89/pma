import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsListPageComponent } from './boards-list-page.component';

describe('BoardsListPageComponent', () => {
  let component: BoardsListPageComponent;
  let fixture: ComponentFixture<BoardsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
