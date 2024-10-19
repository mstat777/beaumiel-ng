import { CanActivateFn, Router, Route } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    // provides the route configuration options.
    const { routeConfig } = route; 
    // provides the path of the route.
    const { path } = routeConfig as Route; 

    //let role: string = '';
    const userData = localStorage.getItem('authUser'); 
    console.log(userData);

    // if user is logged in
    if (userData) {
        const { role } = JSON.parse(userData);
        console.log(role);

        // if user is administrator and is trying to access admin routes, allow access.
        if (path?.includes('admin') && role === 'admin') {
            return true;
        }

        // if user is a client and is accessing client (user) route, allow access.
        if (path?.includes('user') && role === 'client') {
              return true;
        }
    }

    // for any other condition, navigate to the forbidden route:
    router.navigate(['/forbidden'])
    return false;
};