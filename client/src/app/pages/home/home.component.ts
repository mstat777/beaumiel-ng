import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    trPath = "pages.home";
    localStorageData: any;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        window.scrollTo(0, 0);
        this.localStorageData = this.route.snapshot.data['localStorageData'];
        //console.log('this.localStorageData = '+this.localStorageData);
    }
}