import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CartItemComponent } from '../../containers/cart-item/cart-item.component';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [ 
        TranslocoModule,
        CartItemComponent
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    trPath = "pages.cart";
}