import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [TranslocoModule, RouterLink],
    templateUrl: './unauthorized.component.html',
    styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {
    trPath = "pages.unauthorized";
}