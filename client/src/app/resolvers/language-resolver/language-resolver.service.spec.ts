import { TestBed } from '@angular/core/testing';

import { LanguageResolver } from './language-resolver.service';

describe('LanguageResolver', () => {
  let service: LanguageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
