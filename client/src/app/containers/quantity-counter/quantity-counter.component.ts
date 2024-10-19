import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../pages/cart/cart.service';

@Component({
    selector: 'app-quantity-counter',
    standalone: true,
    imports: [FontAwesomeModule, FormsModule],
    templateUrl: './quantity-counter.component.html',
    styleUrl: './quantity-counter.component.scss'
})
export class QuantityCounterComponent {
    @Input() cartItem!: CartItem;
    @Input() itemIndex!: number;
    faPlus = faPlus;
    faMinus = faMinus;
 
    constructor(private cartService: CartService){}

    changeQuantity(modif: string){
        console.log(this.itemIndex);
        this.cartItem.quantity = this.cartService.changeQuantity(modif, this.itemIndex);
        console.log(this.cartItem);
    }
}