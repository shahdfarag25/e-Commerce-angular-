import { TestBed } from '@angular/core/testing';

import { MyplatformService } from './myplatform.service';

describe('MyplatformService', () => {
  let service: MyplatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyplatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
