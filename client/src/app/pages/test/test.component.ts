import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { GoogleMapComponent } from '../../containers/google-map/google-map.component';


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ TranslocoModule, GoogleMapComponent ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
    trPath = "pages.test";
}