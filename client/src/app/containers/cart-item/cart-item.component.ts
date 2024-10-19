import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { NgIf } from '@angular/common';
import { CartItem } from '../../models/types';
import { TranslocoModule } from '@ngneat/transloco';
import { QuantityCounterComponent } from '../quantity-counter/quantity-counter.component';
import { CartService } from '../../pages/cart/cart.service';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [
        FontAwesomeModule, 
        NgIf, 
        TranslocoModule,
        QuantityCounterComponent
    ],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
    @Input() cartItem!: CartItem;
    @Input() itemIndex!: number;
    imgUrl = import.meta.env.NG_APP_IMG_URL;
    trPath = "containers.cartItem"; // transloco path
    faTrashCan = faTrashCan;

    constructor (private cartService: CartService) {}

    deleteCartItem(): void {
        this.cartService.deleteCartItem(this.itemIndex);
    }
}