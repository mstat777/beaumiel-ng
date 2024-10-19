import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { OpenStreetMapComponent } from '../../containers/open-street-map/open-street-map.component';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ TranslocoModule, OpenStreetMapComponent ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
    trPath = "pages.test";
}