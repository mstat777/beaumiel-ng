import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@jsverse/transloco';
import { CartService } from '../../pages/cart/cart.service';

@Component({
    selector: 'app-cart-btn',
    standalone: true,
    imports: [
        FontAwesomeModule, 
        NgIf,
        TranslocoModule
    ],
    templateUrl: './cart-btn.component.html',
    styleUrl: './cart-btn.component.scss'
})
export class CartBtnComponent {
    router = inject(Router);
    faCartShopping = faCartShopping;
    nbCartItems: number = 0;

    constructor (private cartService: CartService) {}

    navigate(url: string) {
        this.router.navigate([url]);
    }

    ngOnInit() {
        this.nbCartItems = this.cartService.getNbCartItems();
        //console.log('this.nbCartItems = '+this.nbCartItems);
    }

    ngDoCheck() {
        this.nbCartItems = this.cartService.getNbCartItems();
        //console.log(this.nbCartItems);
    }
}