import { TestBed } from '@angular/core/testing';

import { MailThisService } from './mail-this.service';

describe('MailThisService', () => {
  let service: MailThisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailThisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
