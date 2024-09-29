import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, 
    faEnvelope, 
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ContactService } from './contact.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [ 
        FontAwesomeModule,
        NgIf,
        ReactiveFormsModule,
        TranslocoModule
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    trPath = "pages.contact";

    faPhone = faPhone;
    faEnvelope = faEnvelope;
    faMapMarkerAlt = faMapMarkerAlt;
    faInstagram = faInstagram;  

    msg: string = '';

    constructor (private contact: ContactService) {}

    checkoutForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        message: new FormControl(''),
    }); 

    ngOnInit(): void {
        this.msg = '';
    }

    onSubmit(): void {
        console.warn('Your order has been submitted', this.checkoutForm.value);
        this.contact.postMessage(this.checkoutForm.value)
          .subscribe(res => {
                        //location.href = 'https://mailthis.to/confirm';
                        this.msg = "Merci de nous avoir contacté.\nVotre message a bien été transmis à notre équipe.";
                        console.log(res);
                      }, 
                      err => {
                        this.msg = "Erreur. Le message n'a pas été envoyé."
                        console.warn(err.responseText);
                        console.log({ err });
                      });
        this.checkoutForm.reset();
    }
}