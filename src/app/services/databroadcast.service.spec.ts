import { TestBed } from '@angular/core/testing';

import { DatabroadcastService } from './databroadcast.service';

describe('DatabroadcastService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatabroadcastService = TestBed.get(DatabroadcastService);
    expect(service).toBeTruthy();
  });
});
