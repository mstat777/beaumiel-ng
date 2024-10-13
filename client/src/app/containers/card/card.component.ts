import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Honey } from '../../models/honey';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ RouterLink, NgIf ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
    @Input() honey!: Honey;
    imgPath: string = "assets/img/products/honey_01_big.jpg";
}