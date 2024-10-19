import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SignService } from '../../sign/sign.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './admin-dashboard.component.html',
    styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
    signService = inject(SignService);
    router = inject(Router);

    public signout() {
        this.signService.signout();
        this.router.navigate(['/signin']);
    }
}