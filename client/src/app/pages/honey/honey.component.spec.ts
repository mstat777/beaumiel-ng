import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HoneyComponent } from './honey.component';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('HoneyComponent', () => {
    let component: HoneyComponent;
    let fixture: ComponentFixture<HoneyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HoneyComponent, getTranslocoModule()],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(HoneyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});