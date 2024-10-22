import { Component, inject } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignService } from '../sign.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@jsverse/transloco';
import { LocalService } from '../../../services/local.service';
import { SigninData } from '../../../models/types';

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ 
        RouterLink, 
        RouterModule,
        NgIf, 
        ReactiveFormsModule,
        FontAwesomeModule, 
        TranslocoModule
    ],
    templateUrl: './signin.component.html',
    styleUrl: '../sign.component.scss'
})
export class SigninComponent {
    router = inject(Router);
    signService = inject(SignService);
    trPath = "pages.signIn";

    logMsg: string = '';
    errMsg: string = '';

    faEnvelope = faEnvelope;
    faLock = faLock;
    passIcon = faEyeSlash;
    passInputType: string = "password";

    isSubmitted: boolean = false;

    emailControl = new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]);
    passwordControl = new FormControl('', [
        Validators.required, 
        Validators.maxLength(128),
    ]);

    protected signinForm: FormGroup = new FormGroup({
        email: this.emailControl,
        password: this.passwordControl
    }); 

    constructor (private localService: LocalService) {}

    changePassIcon(): void {
        if (this.passInputType === "password") {
            this.passIcon = faEye;
            this.passInputType = 'text';
         } else {
            this.passIcon = faEyeSlash;
            this.passInputType = 'password';
         }
    }
    
    clearMessages(): void {
        this.isSubmitted = false;
        this.logMsg = '';
        this.errMsg = '';
    }

    onSubmit(): void {
        this.isSubmitted = true;

        if (this.signinForm.valid){
            this.signService.signin(this.signinForm.value).subscribe({
                next: (result) => {
                    const signinData: SigninData = result as SigninData;
                    const { role } = signinData;
                    console.log(role);
                    role === 'admin' ?
                        this.router.navigate(['/admin']) : this.router.navigate(['/honey']) ;
                }, 
                error: err => {
                    if (err.error[0].msg) {
                        this.errMsg = `Error: ${err.error[0].msg}`;
                    } else {
                        console.log(err);
                    }
                }
            });
        }
    }
}