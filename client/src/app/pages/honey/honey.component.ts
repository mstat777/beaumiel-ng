import { Component } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { CardComponent } from '../../containers/card/card.component';
import { Honey } from '../../models/honey';
import { NgFor, NgIf } from '@angular/common';
import { HoneyService } from './honey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-honey',
  standalone: true,
  imports: [ TranslocoModule, CardComponent, NgFor, NgIf ],
  templateUrl: './honey.component.html',
  styleUrl: './honey.component.scss'
})
export class HoneyComponent {
    trPath = "pages.honey";
    honeys!: Honey[];
    langSubscription!: Subscription;

    constructor(
        private honeyService: HoneyService,
        private translocoService: TranslocoService
    ) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.honeyService.getApiData().subscribe(honeys => this.honeys = honeys);
        this.langSubscription = this.translocoService.events$.subscribe(
            () => this.honeyService.getApiData().subscribe(honeys => this.honeys = honeys)
        );
    }

    ngOnDestroy() {
        this.langSubscription.unsubscribe();
    }
}