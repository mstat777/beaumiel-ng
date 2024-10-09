import { Component, Input } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
    //honeys!: Honey[];
    imgPath: string = "assets/img/products/honey_01_big.jpg";

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        //this.honeys = this.route.snapshot.data[`honeys/${this.activeLang}`];
        //this.honeys = this.route.snapshot.data["honeys"];
        //console.log(this.honeys);
    }
}