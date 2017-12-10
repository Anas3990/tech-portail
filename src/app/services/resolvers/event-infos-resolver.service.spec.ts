import { TestBed, inject } from '@angular/core/testing';

import { EventInfosResolverService } from './event-infos-resolver.service';

describe('EventInfosResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventInfosResolverService]
    });
  });

  it('should be created', inject([EventInfosResolverService], (service: EventInfosResolverService) => {
    expect(service).toBeTruthy();
  }));
});
