import { TestBed } from '@angular/core/testing';
import { HoneyService } from './honey.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('HoneyService', () => {
    let service: HoneyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [getTranslocoModule()],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(HoneyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});