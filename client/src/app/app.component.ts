import { Component } from '@angular/core';
import { RouterOutlet,
        Router,
        RouterEvent,
        NavigationStart,
        NavigationEnd } from '@angular/router';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        FooterComponent,
        NgIf
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    isLoading!: boolean;

    constructor(private _router: Router) {}

    ngOnInit() {
        this.routerEvents();
    }

    routerEvents() {
        this._router.events.subscribe((event: RouterEvent | any) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.isLoading = true;
                    break;
                }
                case event instanceof NavigationEnd: {
                    this.isLoading = false;
                    break;
                }
            }
        });
    }
}