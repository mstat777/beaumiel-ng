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
    imgUrl = import.meta.env.NG_APP_IMG_URL+'flags/';
    langMenu: boolean = false;
    languagesLists: Array<
        Record<'imgUrl'|'code'|'name'|'shorthand', string>
    > = [
        {
            imgUrl: this.imgUrl+'french.png',
            code: 'fr',
            name: 'French',
            shorthand: 'FRE'
        },
        {
            imgUrl: this.imgUrl+'english.png',
            code: 'en',
            name: 'English',
            shorthand: 'ENG'
        },
        {
            imgUrl: this.imgUrl+'bulgarian.png',
            code: 'bg',
            name: 'Bulgarian',
            shorthand: 'BUL'
        }
    ];
    currentLang = this.languagesLists[0];

    constructor(private translocoService: TranslocoService) {}


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