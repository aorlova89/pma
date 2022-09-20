import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmpTitleComponent } from './tmp-title.component';

describe('TmpTitleComponent', () => {
  let component: TmpTitleComponent;
  let fixture: ComponentFixture<TmpTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmpTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmpTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
