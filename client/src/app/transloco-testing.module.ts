import {
    TranslocoTestingModule,
    TranslocoTestingOptions
} from '@jsverse/transloco';
import fr from '../../public/assets/i18n/fr.json';
import en from '../../public/assets/i18n/en.json';
import bg from '../../public/assets/i18n/bg.json';
  
export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
    return TranslocoTestingModule.forRoot({
        langs: { fr, en, bg },
        translocoConfig: {
                availableLangs: ['fr', 'en', 'bg'],
                defaultLang: 'fr',
        },
        preloadLangs: true,
        ...options,
    });
}