import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [ NgFor, NgIf ],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    imgUrl = import.meta.env.NG_APP_IMG_URL+'flags/';
    showLangMenu: boolean = false;
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
    currentLang!: Record<'imgUrl'|'code'|'name'|'shorthand', string>; // the default language data (see LocalStorageResolver)

    constructor(
        private translocoService: TranslocoService,
        private localService: LocalService
    ) {}

    ngOnInit() {
        this.getActiveLanguageData();
    }

    changeLanguage(languageCode: string): void {
        this.translocoService.setActiveLang(languageCode);
        this.localService.saveData('lang', languageCode);
        this.toggleLangMenu();
        this.getActiveLanguageData();
    }

    // show/hide language menu
    toggleLangMenu(): void {
        this.showLangMenu = !this.showLangMenu;
    }

    // get active language data in order to display the selected language (name and image) in the LanguageSelector button
    getActiveLanguageData(): void {
        this.languagesLists.forEach(el => {
            if (this.translocoService.getActiveLang() === el.code){
                this.currentLang = el;
            }
        });
    }
}