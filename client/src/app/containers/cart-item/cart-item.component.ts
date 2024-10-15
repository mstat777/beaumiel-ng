import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
    faPlus = faPlus;
    faMinus = faMinus;
    faTrashCan = faTrashCan;
    
}