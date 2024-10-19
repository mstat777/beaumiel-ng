import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SignService {
    httpClient = inject(HttpClient);
    baseURL = import.meta.env.NG_APP_BASE_URL;

    signin(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signin`, data).pipe(tap((result) => {
            console.log(result);
            console.log(typeof(result));
            localStorage.setItem('authUser', JSON.stringify(result));
        }));
    }

    signup(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signup`, data);
    }

    signout() {
        localStorage.removeItem('authUser');
    }

    isLoggedIn() {
        return localStorage.getItem('authUser') !== null;
    }
}