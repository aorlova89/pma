import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmaFooterComponent } from './pma-footer.component';

describe('PmaFooterComponent', () => {
  let component: PmaFooterComponent;
  let fixture: ComponentFixture<PmaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmaFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
