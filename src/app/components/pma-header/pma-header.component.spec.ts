import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaHeaderComponent } from './pma-header.component';

describe('PmaHeaderComponent', () => {
  let component: PmaHeaderComponent;
  let fixture: ComponentFixture<PmaHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmaHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmaHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
