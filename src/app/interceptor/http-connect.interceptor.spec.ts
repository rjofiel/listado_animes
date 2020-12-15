import { TestBed } from '@angular/core/testing';

import { HttpConnectInterceptor } from './http-connect.interceptor';

describe('HttpConnectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpConnectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpConnectInterceptor = TestBed.inject(HttpConnectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
