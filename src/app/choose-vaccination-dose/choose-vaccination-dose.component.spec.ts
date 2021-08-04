import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVaccinationDoseComponent } from './choose-vaccination-dose.component';

describe('ChooseVaccinationDoseComponent', () => {
  let component: ChooseVaccinationDoseComponent;
  let fixture: ComponentFixture<ChooseVaccinationDoseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseVaccinationDoseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVaccinationDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
