import { TestBed } from '@angular/core/testing';

import { SendDataServiceService } from './send-data-service.service';

describe('SendDataServiceService', () => {
  let service: SendDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
