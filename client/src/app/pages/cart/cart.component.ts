import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { CartItemComponent } from '../../containers/cart-item/cart-item.component';
import { LocalService } from '../../services/local.service';
import { CartItem } from '../../models/types';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [ 
        TranslocoModule,
        CartItemComponent,
        NgIf,
        NgFor
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    trPath = "pages.cart";
    cart!: CartItem[];
    packagings!: [];

    constructor(
        private localService: LocalService
    ){}

    ngOnInit(){
        const data = this.localService.getData('cart');
        this.cart = data ? JSON.parse(data) : [];
        console.log(this.cart);
    }
}