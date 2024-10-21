import { CanActivateFn, Router, Route } from '@angular/router';
import { inject } from '@angular/core';
import { LocalService } from '../services/local.service';
import { SignService } from '../pages/sign/sign.service';
import { UserData } from '../models/types';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const localService = new LocalService();
    const signService = new SignService(localService);

    const { routeConfig } = route; // provides the route configuration options
    const { path } = routeConfig as Route; // provides route's path

    const authUser = localService.getData('authUser'); 

    // if user is logged in (a token exists)
    if (authUser) {
        const { TOKEN } = JSON.parse(authUser);

        // verify token on server:
        signService.checkToken(TOKEN)
        .subscribe({
                next: (res) => {
                    const userData: UserData = res as UserData;
                    const { msg, role } = userData;

                    if(msg === "authenticated"){
                        // if user is administrator and is trying to access admin routes, allow access:
                        if (role === 'admin' && path?.includes('admin')) {
                            return true;
                        }

                        // if user is a client and is accessing client (user) route, allow access.
                        console.log(`${path} et ${role}`);
                        console.log(path?.includes('user') && (role === 'client' || role === 'admin'));
                        
                        if ((role === 'client' || role === 'admin') && path?.includes('user')) {
                            return true;
                        }

                        console.log("User is trying to access unathorized content!");
                        return false;
                    }
                    console.log("User is not authenticated!");
                    return false;
                }, 
                error: err => console.log(err)
        });
    }
    
    // for any other condition, navigate to the forbidden route:
    console.log("Authentication token is missing or corrupted!");
    router.navigate(['/forbidden']);
    return false;
};