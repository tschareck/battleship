import { TestBed } from '@angular/core/testing';

import { PlacementService } from '../app/services/placement.service';

describe('PlacementServiceService', () => {
  let service: PlacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
