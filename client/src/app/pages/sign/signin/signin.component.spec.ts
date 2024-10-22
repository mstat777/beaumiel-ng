import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { getTranslocoModule } from '../../../transloco-testing.module';

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SigninComponent, getTranslocoModule()],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});