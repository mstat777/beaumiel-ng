import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    langMenu: boolean = false;

    constructor(private translocoService: TranslocoService) {}

    languagesLists: Array<
        Record<'imgUrl'|'code'|'name'|'shorthand', string>
    > = [
        {
            imgUrl: 'assets/img/flags/french.png',
            code: 'fr',
            name: 'French',
            shorthand: 'FRE'
        },
        {
            imgUrl: 'assets/img/flags/english.png',
            code: 'en',
            name: 'English',
            shorthand: 'ENG'
        },
        {
            imgUrl: 'assets/img/flags/bulgarian.png',
            code: 'bg',
            name: 'Bulgarian',
            shorthand: 'BUL'
        }
    ];

    currentLang: Record<'imgUrl'|'code'|'name'|'shorthand', string> = {
        imgUrl: 'assets/img/flags/french.png',
        code: 'fr',
        name: 'French',
        shorthand: 'FRE'
    };

    changeLanguage(languageCode: string): void {
        this.translocoService.setActiveLang(languageCode);
        this.setLangMenu();
        this.getImgURL();
    }

    setLangMenu(): void {
        this.langMenu = !this.langMenu;
    }

    getImgURL(): void {
        this.languagesLists.forEach(el => {
            if (this.translocoService.getActiveLang() === el.code){
                this.currentLang = el;
            }
        });
    }
}