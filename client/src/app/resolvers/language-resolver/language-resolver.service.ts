import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
    providedIn: 'root'
})
export class LanguageResolver implements Resolve<any> {
    constructor(
        private localService: LocalService,
        private translocoService: TranslocoService
    ) { }

    detectLangChange(locStorageLang: string) {
        const tLocoLang = this.translocoService.getActiveLang();
        if (locStorageLang !== tLocoLang) {
            this.translocoService.setActiveLang(locStorageLang);
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const data = this.localService.getData('lang');
        if (data) {
            this.detectLangChange(data);
            return data;
        } else {
            this.localService.saveData('lang', 'fr');
            return 'fr';
        }
    }
}