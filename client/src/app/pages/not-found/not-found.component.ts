import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [ TranslocoModule, RouterLink ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    trPath = "pages.notFound";
}