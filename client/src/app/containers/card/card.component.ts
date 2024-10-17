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
    imgUrl = import.meta.env.NG_APP_IMG_URL;
}