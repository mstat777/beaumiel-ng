import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    httpClient = inject(HttpClient);
    baseURL = import.meta.env.NG_APP_BASE_URL;

    signin(data: any) {
        return this.httpClient.post(`${this.baseURL}/user/signin`, data).pipe(tap((result) => {
            localStorage.setItem('authUser', JSON.stringify(result));
        }));
    }

    signup(data: any) {
        return this.httpClient.post(`${this.baseURL}/user/signup`, data);
    }

    signout() {
        localStorage.removeItem('authUser');
    }

    isLoggedIn() {
        return localStorage.getItem('authUser') !== null;
    }
}