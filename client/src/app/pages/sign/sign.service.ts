import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalService } from '../../services/local.service';

@Injectable({
    providedIn: 'root'
})
export class SignService {
    httpClient = inject(HttpClient);
    baseURL = import.meta.env.NG_APP_BASE_URL;

    constructor (private localService: LocalService) {}

    signin(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signin`, data).pipe(tap((result) => {
            console.log(result);
            this.localService.saveData('authUser', JSON.stringify(result));
        }));
    }

    signup(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signup`, data);
    }

    signout() {
        this.localService.removeData('authUser');
    }

    checkToken(token: string) {
        return this.httpClient.post(`${this.baseURL}/sign/check-token`, null, {headers: { Authorization: `Bearer ${token}`}})
    }
}