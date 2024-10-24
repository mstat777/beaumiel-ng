import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, 
    faEnvelope, 
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ContactService } from './contact.service';
import { TranslocoModule } from '@jsverse/transloco';

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

    okMsg: string = '';
    errMsg: string = '';
    isSubmitted: boolean = false;

    constructor (private contactService: ContactService) {}

    nameControl = new FormControl('', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(40),
        Validators.pattern(/^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i)
    ]);
    emailControl = new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]);
    messageControl = new FormControl('', [
        Validators.required, 
        Validators.minLength(10),
        Validators.maxLength(600)
    ]);

    checkoutForm: FormGroup = new FormGroup({
        name: this.nameControl,
        email: this.emailControl,
        message: this.messageControl
    }); 

    ngOnInit(): void {
        this.okMsg = '';
        this.errMsg = '';
    }

    onSubmit(): void {
        this.isSubmitted = true;

        if (this.checkoutForm.valid){
            this.contactService.postMessage(this.checkoutForm.value)
            .subscribe({
                next: res => {
                    this.okMsg = "Merci de nous avoir contacté.\nVotre message a bien été transmis à notre équipe.";
                    this.checkoutForm.reset();
                }, 
                error: err => {
                    this.errMsg = "Erreur. Le message n'a pas été envoyé."
                    console.warn(err.responseText);
                    console.log({ err });
                }
            });
        }
    }
}