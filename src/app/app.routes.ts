import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestComponent } from './pages/test/test.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HoneyComponent } from './pages/honey/honey.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'honey', component: HoneyComponent },
    { path: 'honey/detail/01', component: DetailComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'test', component: TestComponent },
    { path: '**', component: NotFoundComponent }
];
