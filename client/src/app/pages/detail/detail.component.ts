import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Honey } from '../../models/honey';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { HoneyService } from '../honey/honey.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [TranslocoModule, FontAwesomeModule, NgIf],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
    imgUrl = import.meta.env.NG_APP_IMG_URL;
    trPath= "pages.detail";
    faStar = faStar;
    faHeart = faHeart;
    faCartShopping = faCartShopping;
    honey!: Honey;
    id!: number;
    langSubscription!: Subscription;
    
    constructor(
        private honeyService: HoneyService,
        private translocoService: TranslocoService,
        private route: ActivatedRoute,
        private localService: LocalService
    ) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.id = Number(this.route.snapshot.params['id']);
        this.honeyService.getApiData().subscribe(honeys => this.honey = honeys[this.id-1]);
        this.langSubscription = this.translocoService.events$.subscribe(
            () => this.honeyService.getApiData().subscribe(honeys => this.honey = honeys[this.id-1])
            );
        this.localService.saveData(`cart`, '[]');
        }

    addToCart() {
        let cart = this.localService.getData('cart');
        console.log(cart);
        //this.localService.saveData(`item${}`, this.honey.name);
    }
}