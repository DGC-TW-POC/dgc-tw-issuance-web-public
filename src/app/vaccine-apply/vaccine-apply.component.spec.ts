import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineApplyComponent } from './vaccine-apply.component';

describe('VaccineApplyComponent', () => {
  let component: VaccineApplyComponent;
  let fixture: ComponentFixture<VaccineApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccineApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
