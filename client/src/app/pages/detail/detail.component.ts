import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Honey, Packaging, CartItem } from '../../models/types';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { HoneyService } from '../honey/honey.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { LocalService } from '../../services/local.service';
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        TranslocoModule, 
        FontAwesomeModule, 
        NgIf,
        NgFor
    ],
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
    packagings!: Packaging[];
    selectedPackIndex: number = 0;
    id!: number;
    langSubscription!: Subscription;
    packagingsSubscription!: Subscription;
    
    constructor(
        private honeyService: HoneyService,
        private translocoService: TranslocoService,
        private route: ActivatedRoute,
        private localService: LocalService,
        private cartService: CartService
    ) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.id = Number(this.route.snapshot.params['id']);
        this.honeyService.getHoneysData().subscribe(honeys => this.honey = honeys[this.id-1]);
        // get honeys' main data from API according to the current language:
        this.langSubscription = this.translocoService.events$.subscribe(
            () => this.honeyService.getHoneysData().subscribe(honeys => this.honey = honeys[this.id-1])
            );
        // get honeys' Packagings data from API:
        this.packagingsSubscription = this.honeyService.getPackagingsData(this.id).subscribe(packagings =>
            this.packagings = packagings);
    }

    ngOnDestroy(){
        this.langSubscription.unsubscribe();
        this.packagingsSubscription.unsubscribe();
    }

    onChangeSelect(e: any){
        this.selectedPackIndex = e.target.value;
    }

    addToCart() {
        let cartItem: CartItem = {
            name: this.honey.name,
            subtitle: this.honey.subtitle,
            size: this.packagings[this.selectedPackIndex].size,
            quantity: 1,
            price: this.packagings[this.selectedPackIndex].price,
        };
        this.cartService.addToCart(cartItem); 
    }
}