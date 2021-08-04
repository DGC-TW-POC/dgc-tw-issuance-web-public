import { TestBed } from '@angular/core/testing';

import { VaccineApplyService } from './vaccine-apply.service';

describe('VaccineApplyService', () => {
  let service: VaccineApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
