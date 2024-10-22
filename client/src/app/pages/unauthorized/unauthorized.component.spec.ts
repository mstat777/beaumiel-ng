import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthorizedComponent } from './unauthorized.component';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('UnauthorizedComponent', () => {
    let component: UnauthorizedComponent;
    let fixture: ComponentFixture<UnauthorizedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnauthorizedComponent, getTranslocoModule()],
        })
        .compileComponents();

        fixture = TestBed.createComponent(UnauthorizedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});