import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { ProductCardComponent } from '../../containers/product-card/product-card.component';
import { Honey } from '../../models/types';
import { NgFor, NgIf } from '@angular/common';
import { HoneyService } from './honey.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-honey',
    standalone: true,
    imports: [ 
        TranslocoModule, 
        ProductCardComponent, 
        NgFor, 
        NgIf 
    ],
    templateUrl: './honey.component.html',
    styleUrl: './honey.component.scss'
})
export class HoneyComponent {
    trPath = "pages.honey";
    honeys!: Honey[];
    honeyDataSubscription!: Subscription;
    langSubscription!: Subscription;

    constructor(
        private honeyService: HoneyService,
        private translocoService: TranslocoService
    ) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.honeyDataSubscription = this.honeyService.getHoneysData()
            .subscribe(honeys => this.honeys = honeys);
        this.langSubscription = this.translocoService.events$
            .subscribe(
                () => this.honeyService.getHoneysData().subscribe(honeys => this.honeys = honeys)
            );
    }

    ngOnDestroy() {
        this.honeyDataSubscription.unsubscribe();
        this.langSubscription.unsubscribe();
    }
}