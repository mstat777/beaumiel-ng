import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalService } from '../../services/local.service';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageResolver implements Resolve<any> {

    constructor(
        private localService: LocalService,
        private translocoService: TranslocoService
    ) { }

    detectLangChange(locStorageLang: string) {
        const tLocoLang = this.translocoService.getActiveLang();
        //console.log('tLocoLang = ',tLocoLang);
        //console.log('locStorageLang = ',locStorageLang);
        if (locStorageLang !== tLocoLang) {
            this.translocoService.setActiveLang(locStorageLang);
        }
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const data = this.localService.getData('lang');
        //console.log(data);
        if (data) {
            this.detectLangChange(data);
            return data;
        } else {
            this.localService.saveData('lang', 'fr');
            return 'fr';
        }
    }
}