import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
    selector: 'app-delivery',
    standalone: true,
    imports: [TranslocoModule],
    templateUrl: './delivery.component.html',
    styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
    trPath = "pages.delivery"; // TransLoco path
}