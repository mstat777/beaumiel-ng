import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
    constructor(private translocoService: TranslocoService) {}

    public languagesLists: Array<
        Record<'imgUrl'|'code'|'name'|'shorthand', string>
    > = [
        {
            imgUrl: '/assets/images/flags/french.png',
            code: 'fr',
            name: 'French',
            shorthand: 'FRE'
        },
        {
            imgUrl: '/assets/images/flags/english.png',
            code: 'en',
            name: 'English',
            shorthand: 'ENG'
        }
    ];

    public changeLanguage(languageCode: string): void {
        this.translocoService.setActiveLang(languageCode);
    }
}