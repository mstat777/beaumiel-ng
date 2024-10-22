import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LocalService } from '../../services/local.service';
import { SigninData, UserData } from '../../models/types';

@Injectable({
    providedIn: 'root'
})
export class SignService {
    httpClient = inject(HttpClient);
    baseURL = import.meta.env.NG_APP_BASE_URL;
    isAuthenticated!: boolean;
    authError!: string;

    constructor (private localService: LocalService) {}

    signin(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signin`, data).pipe(tap((result) => {
            console.log(result);
            const signinData: SigninData = result as SigninData;
            console.log(signinData);
            const { token } = signinData;
            console.log(token);
            this.localService.saveData('authUser', JSON.stringify(token));
        }));
    }

    signup(data: any) {
        return this.httpClient.post(`${this.baseURL}/sign/signup`, data);
    }

    signout() {
        this.localService.removeData('authUser');
    }

    checkToken(token: string) {
        console.log(token);
        return this.httpClient.post(`${this.baseURL}/sign/check-token`, null, {headers: { Authorization: `Bearer ${token}`}})
    }

    getAuthenticated(): boolean {
        return this.isAuthenticated;
    }

    checkAuthetication(token: string){
        this.checkToken(token).subscribe({
            next: (res) => {
                const userData: UserData = res as UserData;
                console.log(userData);
                const { status, role } = userData;
                console.log('status = '+status);
                console.log('role = '+role);
                if(status !== "authenticated"){
                    console.log('status = '+status);
                    this.authError = "User is not authenticated!";
                    console.log(this.authError);
                    return false;
                } else {
                    return true;
                }
            },
            error: (err) => console.log(err)
        });
    }
}