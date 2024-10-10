import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
    authService = inject(AuthService);
    router = inject(Router);

    public signout() {
        this.authService.signout();
        this.router.navigate(['/user/signin']);
    }
}