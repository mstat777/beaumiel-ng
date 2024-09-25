import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BurgerBtnComponent } from '../burger-btn/burger-btn.component';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        BurgerBtnComponent, 
        LanguageSelectorComponent,
        NgIf,
        NgClass,
        RouterLink
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    wMobile: string = '(max-width: 767px)';
    isMobile!: boolean;
    navDisplay: boolean = false;

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([this.wMobile])
            .subscribe(result => {
                const breakpoints = result.breakpoints;
                this.isMobile = breakpoints[this.wMobile] ? true : false;
            });
      }
    
    ngOnInit(): void {
        this.hideNav();
    }

    scrollToTop(): void {
        window.scrollTo(0, 0);
    }

    hideNav(): void {
        this.navDisplay = false;
    }

    receiveNavDisplayState(val: boolean) {
        this.navDisplay = val;
    }
}