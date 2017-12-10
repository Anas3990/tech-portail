import { TestBed, inject } from '@angular/core/testing';

import { NewInfosResolverService } from './new-infos-resolver.service';

describe('NewInfosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewInfosResolverService]
    });
  });

  it('should be created', inject([NewInfosResolverService], (service: NewInfosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
