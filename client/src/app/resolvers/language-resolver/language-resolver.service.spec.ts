import { TestBed } from '@angular/core/testing';
import { LanguageResolver } from './language-resolver.service';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('LanguageResolver', () => {
    let service: LanguageResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()]
        });
        service = TestBed.inject(LanguageResolver);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
