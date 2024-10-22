import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantityCounterComponent } from './quantity-counter.component';
import { getTranslocoModule } from '../../transloco-testing.module';

describe('QuantityCounterComponent', () => {
    let component: QuantityCounterComponent;
    let fixture: ComponentFixture<QuantityCounterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [QuantityCounterComponent, getTranslocoModule()]
        })
        .compileComponents();

        fixture = TestBed.createComponent(QuantityCounterComponent);
        component = fixture.componentInstance;
        component.cartItem = {
            name: "Cool honey",
            subtitle: "Cool honey subtitle test",
            size: "690",
            quantity: 1,
            price: 13.58
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display cartItem.quantity', () => {
        const quantityInputElement = fixture.nativeElement.querySelector('input');
        expect(quantityInputElement.value).toContain(1);
    });
});