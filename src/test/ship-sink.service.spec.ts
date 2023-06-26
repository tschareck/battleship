import { TestBed } from '@angular/core/testing';

import { ShipSinkService } from '../app/services/ship-sink.service';

describe('ShipSinkService', () => {
  let service: ShipSinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipSinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
