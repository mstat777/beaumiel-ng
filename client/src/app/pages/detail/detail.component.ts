import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { Honey } from '../../models/honey';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
    faStar = faStar;
    faHeart = faHeart;
    honeys!: Honey[];
    honey!: Honey;
    id!: number;
    
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.honeys = this.route.snapshot.data["honeys"];
        //console.log(this.honeys);
        this.id = Number(this.route.snapshot.params['id']);
        console.log(this.id);
        this.honey = this.honeys[this.id-1];
    }
}