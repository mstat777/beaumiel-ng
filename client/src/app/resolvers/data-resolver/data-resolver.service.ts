import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Honey } from '../../models/honey';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {
    baseURL = import.meta.env.NG_APP_BASE_URL;
    //activeLang: string = '';

    constructor(
        private http: HttpClient,
        private translocoService: TranslocoService
    ) {
        
    }
/*
    this.translocoService.langChanges$.subscribe({
        next: lang => {
            console.log("language changed: "+lang);
            this.getHoneyList();
        }
    });*/

    //this.activeLang = this.translocoService.getActiveLang();
    getHoneyList() {
        const lang = this.translocoService.getActiveLang();
        let URL = `${this.baseURL}/honeys/${lang}`;
        return this.http.get<Honey[]>(URL);
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.getHoneyList();
    }
}