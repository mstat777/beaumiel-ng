import { Injectable } from '@angular/core';
import { CartItem } from '../../models/types';
import { LocalService } from '../../services/local.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart: CartItem[] = [];
    totalPrice: number = 0;
    nbCartItems: number = 0;

    constructor(private localService: LocalService) { }

    saveCartState() {
        this.localService.saveData('cart', JSON.stringify(this.cart));
    }

    addToCart(item: CartItem): void {
        //console.log(this.cart);
        //console.log(item);
        this.cart.push(item);
        console.log(this.cart);
        this.saveCartState();
        this.calculateNbItems();
    }

    getCart(): CartItem[]{
        const data = this.localService.getData('cart');
        console.log(data);
        if (data) { // if 'cart' exists
            this.cart = JSON.parse(data);
            this.calculateNbItems();
        } else { // if 'cart' doesn't exist, then create it
            this.cart = [];
            this.saveCartState();
        }

        return this.cart;
    }

    deleteCartItem(index: number): void {
        this.cart.splice(index, 1);
        //console.log(this.cart);
        this.saveCartState();
        console.log(this.cart);
        this.calculateNbItems();
    }

    calculateTotalPrice(cart: CartItem[]): number {
        let totalPrice: number = 0;
        cart.forEach(item => {
            totalPrice += item.quantity * item.price;
        });
        return totalPrice;
    }

    changeQuantity(modif: string, itemIndex: number): number {
        console.log(itemIndex);
        console.log(this.cart);
        console.log(this.cart[itemIndex]);
        if (modif === 'minus' && this.cart[itemIndex].quantity > 1) this.cart[itemIndex].quantity--;
        if (modif === 'plus' && this.cart[itemIndex].quantity < 99) this.cart[itemIndex].quantity++;
        this.saveCartState();
        this.calculateNbItems();
        return this.cart[itemIndex].quantity;
    }

    calculateNbItems(): void {
        let nb: number = 0;
        this.cart.forEach(item => {
            nb += item.quantity;
        });
        console.log(nb);
        this.nbCartItems = nb;
    }

    getNbCartItems(): number {
        return this.nbCartItems;
    }
}