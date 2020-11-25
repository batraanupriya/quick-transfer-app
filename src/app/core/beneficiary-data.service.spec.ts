import { TestBed } from '@angular/core/testing';

import { BeneficiaryDataService } from './beneficiary-data.service';

describe('BeneficiaryDataService', () => {
  let service: BeneficiaryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
