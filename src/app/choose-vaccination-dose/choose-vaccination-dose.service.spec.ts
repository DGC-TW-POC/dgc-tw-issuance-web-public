import { TestBed } from '@angular/core/testing';

import { ChooseVaccinationDoseService } from './choose-vaccination-dose.service';

describe('ChooseVaccinationDoseService', () => {
  let service: ChooseVaccinationDoseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseVaccinationDoseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
