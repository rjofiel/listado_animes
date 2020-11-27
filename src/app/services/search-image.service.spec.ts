import { TestBed } from '@angular/core/testing';

import { SearchImageService } from './search-image.service';

describe('SearchImageService', () => {
  let service: SearchImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
