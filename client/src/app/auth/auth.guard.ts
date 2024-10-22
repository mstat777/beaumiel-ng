import { CanActivateFn, Router, Route } from '@angular/router';
import { inject } from '@angular/core';
import { LocalService } from '../services/local.service';
import { SignService } from '../pages/sign/sign.service';
import { UserData } from '../models/types';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const localService = new LocalService();
    const signService = new SignService(localService);

    const { routeConfig } = route; // provides the route configuration options
    const { path } = routeConfig as Route; // provides route's path

    // check if a key 'authUser' exists in localStorage
    const authUser = localService.getData('authUser'); 
    console.log(authUser);
    console.log(typeof(authUser));

    // if user isn't logged in (token doesn't exists)
    if (!authUser) {
        console.log("Authentication token is missing!");
        router.navigate(['/forbidden']);
        return false;
    } else {
        const token = JSON.parse(authUser);
        console.log(token);
        console.log("authUser is being verified");

        // verify token on server:
        return signService.checkToken(token)
        .pipe(map((res) => {
                    const userData: UserData = res as UserData;
                    console.log(userData);
                    const { status, role } = userData;
                    console.log('status = '+status);
                    console.log('role = '+role);
                    if(status !== "authenticated"){
                        console.log('status = '+status);
                        console.log("User is not authenticated!");
                        return false;
                    } else {
                        // if user is administrator and is trying to access admin routes, allow access:
                        if (role === 'admin' && path?.includes('admin')) {
                            console.log("ok, continue to admin");
                            return true;
                        // if user is a client and is accessing client (user) route, allow access.
                        } else if ((role === 'client' || role === 'admin') && path?.includes('user')) {
                            console.log("ok, continue to admin");
                            return true;
                        // else don't allow access:
                        } else {
                            console.log("User is trying to access unathorized content!");
                            return false;
                        }
                    }
                }));
    } 
};