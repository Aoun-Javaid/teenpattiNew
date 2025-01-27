import { TestBed } from '@angular/core/testing';

import { ConditionhandlerService } from './conditionhandler.service';

describe('ConditionhandlerService', () => {
  let service: ConditionhandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionhandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
