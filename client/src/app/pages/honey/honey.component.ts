import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CardComponent } from '../../containers/card/card.component';

@Component({
  selector: 'app-honey',
  standalone: true,
  imports: [ TranslocoModule, CardComponent ],
  templateUrl: './honey.component.html',
  styleUrl: './honey.component.scss'
})
export class HoneyComponent {
    trPath = "pages.honey";
}