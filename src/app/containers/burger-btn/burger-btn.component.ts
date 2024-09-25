import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-burger-btn',
  standalone: true,
  imports: [ FontAwesomeModule ],
  templateUrl: './burger-btn.component.html',
  styleUrl: './burger-btn.component.scss'
})
export class BurgerBtnComponent {
    @Input() navDisplay!: boolean;
    @Output() navDisplayState = new EventEmitter<boolean>();
    faBars = faBars;

    log(val: any): void {
        console.log(val);
    }

    setNavState(){
        this.navDisplay = !this.navDisplay;
        this.navDisplayState.emit(this.navDisplay);
    }
}