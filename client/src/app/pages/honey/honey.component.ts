import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CardComponent } from '../../containers/card/card.component';
import { Honey } from '../../models/honey';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-honey',
  standalone: true,
  imports: [ TranslocoModule, CardComponent, NgFor ],
  templateUrl: './honey.component.html',
  styleUrl: './honey.component.scss'
})
export class HoneyComponent {
    trPath = "pages.honey";
    honeys!: Honey[];

    constructor(private route: ActivatedRoute) {
        this.honeys = [];
    }

    ngOnInit() {
        window.scrollTo(0, 0);
        this.honeys = this.route.snapshot.data["honeys"];
    }
}