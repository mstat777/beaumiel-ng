import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { NgIf } from '@angular/common';
import { CartItem, Packaging } from '../../models/types';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [FontAwesomeModule, NgIf, TranslocoModule],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
    @Input() cartItem!: CartItem;
    imgUrl = import.meta.env.NG_APP_IMG_URL;
    trPath = "containers.cartItem"; // transloco path

    faPlus = faPlus;
    faMinus = faMinus;
    faTrashCan = faTrashCan;
    packaging!: Packaging;
}