import { Component } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { CartItemComponent } from '../../containers/cart-item/cart-item.component';
import { CartItem } from '../../models/types';
import { CartService } from './cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [ 
        TranslocoModule,
        CartItemComponent,
        NgIf,
        NgFor,
        CommonModule
    ],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {
    trPath = "pages.cart";
    cart!: CartItem[];
    totalPrice!: number;

    constructor(private cartService: CartService){}

    ngOnInit(){
        this.cart = this.cartService.getCart();
        console.log(this.cart);
        this.totalPrice = this.cartService.calculateTotalPrice(this.cart);
    }

    ngDoCheck() {
        if(this.totalPrice) {
            this.totalPrice = this.cartService.calculateTotalPrice(this.cart)
        }
    }
}