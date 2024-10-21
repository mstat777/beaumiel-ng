import { Routes } from '@angular/router';
import { LanguageResolver } from './resolvers/language-resolver/language-resolver.service';
import { authGuard } from './auth/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestComponent } from './pages/test/test.component';
import { HoneyComponent } from './pages/honey/honey.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { SigninComponent } from './pages/sign/signin/signin.component';
import { SignupComponent } from './pages/sign/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        resolve: {
            localStorageData: LanguageResolver
        },
        children: [
            { path: '', 
                redirectTo: 'home', 
                pathMatch: 'full' },
            { path: 'home', 
                component: HomeComponent},
            { path: 'honey', 
                component: HoneyComponent},
            { path: 'detail/:id', 
                component: DetailComponent},
            { path: 'cart', 
                component: CartComponent},  
            { path: 'about', 
                component: AboutComponent },
            { path: 'contact', 
                component: ContactComponent },
            { path: 'test', 
                component: TestComponent },
            { path: 'delivery', 
                component: DeliveryComponent },  

            
            { path: 'signin', 
                component: SigninComponent }, 
            { path: 'signup', 
                component: SignupComponent },

            // user & admin pages
            { path: 'user', 
                component: UserDashboardComponent,
                canActivate: [authGuard] },

            { path: 'admin', 
                component: AdminDashboardComponent,
                canActivate: [authGuard] },

            // error pages
            { path: 'forbidden', 
                component: UnauthorizedComponent },
            { path: '**', 
                component: NotFoundComponent }
        ]
    }
];