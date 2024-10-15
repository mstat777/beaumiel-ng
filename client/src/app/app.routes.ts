import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestComponent } from './pages/test/test.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HoneyComponent } from './pages/honey/honey.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DataResolverService } from './resolvers/data-resolver/data-resolver.service';
import { SigninComponent } from './pages/user/signin/signin.component';
import { authGuard } from './auth/auth.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' },
    { path: 'home', 
        component: HomeComponent},
        /*runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
            honeys: DataResolverService
        }},*/
    { path: 'honey', 
        component: HoneyComponent},
        /*runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
            honeys: DataResolverService
        }},*/
    { path: 'detail/:id', 
        component: DetailComponent},
        /*runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        resolve: {
            honeys: DataResolverService
        }},*/
    { path: 'cart', 
        component: CartComponent },  
    { path: 'about', 
        component: AboutComponent },
    { path: 'contact', 
        component: ContactComponent },
    { path: 'test', 
        component: TestComponent },

    { path: 'user/signin', 
        component: SigninComponent }, 
    { path: 'user/signup', 
        component: SignupComponent },   

    { path: 'admin', 
        component: AdminDashboardComponent,
        canActivate: [authGuard] },

    { path: '**', 
        component: NotFoundComponent }
];