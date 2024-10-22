import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Honey } from '../../models/types';
import { NgIf } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ RouterLink, NgIf, TranslocoModule ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
    @Input() honey!: Honey;
    imgUrl = import.meta.env.NG_APP_IMG_URL;
    trPath = "containers.productCard"; // transloco path
}