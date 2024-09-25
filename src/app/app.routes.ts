import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TestComponent } from './pages/test/test.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'fr/home', pathMatch: 'full' },
    { path: 'fr/home', component: HomeComponent },
    { path: 'fr/about', component: AboutComponent },
    { path: 'fr/contact', component: ContactComponent },
    { path: 'fr/test', component: TestComponent },
    { path: '**', component: NotFoundComponent }
];
