import { Component, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BurgerBtnComponent } from '../burger-btn/burger-btn.component';
import { CartBtnComponent } from '../cart-btn/cart-btn.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SignService } from '../../pages/sign/sign.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        BurgerBtnComponent, 
        CartBtnComponent,
        LanguageSelectorComponent,
        NgIf,
        NgClass,
        RouterLink,
        TranslocoModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    imgUrl = import.meta.env.NG_APP_IMG_URL;
    wMobile: string = '(max-width: 767px)';
    isMobile!: boolean;
    navDisplay: boolean = false;
    //isLogged!: boolean;
    signService = inject(SignService);

    constructor(
        breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver.observe([this.wMobile])
            .subscribe(res => {
                const breakpoints = res.breakpoints;
                this.isMobile = breakpoints[this.wMobile] ? true : false;
            });
    }
    
    ngOnInit() {
        this.hideNav();
    }

    isLogged(): boolean {
        return localStorage.getItem('authUser') !== null;
    }

    scrollToTop() {
        window.scrollTo(0, 0);
    }

    hideNav() {
        this.navDisplay = false;
    }

    receiveNavDisplayState(val: boolean) {
        this.navDisplay = val;
    }

    signout() {
        this.signService.signout();
    }
}