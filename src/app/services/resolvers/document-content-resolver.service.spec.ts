import { TestBed, inject } from '@angular/core/testing';

import { DocumentContentResolverService } from './document-content-resolver.service';

describe('DocumentContentResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentContentResolverService]
    });
  });

  it('should be created', inject([DocumentContentResolverService], (service: DocumentContentResolverService) => {
    expect(service).toBeTruthy();
  }));
});
