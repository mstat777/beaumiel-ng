import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryComponent } from './delivery.component';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('DeliveryComponent', () => {
    let component: DeliveryComponent;
    let fixture: ComponentFixture<DeliveryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DeliveryComponent, getTranslocoModule()]
        })
        .compileComponents();

        fixture = TestBed.createComponent(DeliveryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});