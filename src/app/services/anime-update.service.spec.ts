import { TestBed } from '@angular/core/testing';

import { AnimeUpdateService } from './anime-update.service';

describe('AnimeUpdateService', () => {
  let service: AnimeUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
