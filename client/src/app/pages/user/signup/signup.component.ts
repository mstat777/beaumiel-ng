import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        RouterLink,
        ReactiveFormsModule,
        FontAwesomeModule, 
        TranslocoModule,
        NgIf
    ],
    templateUrl: './signup.component.html',
    styleUrl: '../sign.component.scss'
})
export class SignupComponent {
    router = inject(Router);
    authService = inject(AuthService);
    trPath = "pages.signUp";

    logMsg: string = '';
    errMsg: string = '';
    name: string = '';
    email: string = '';
    password: string = '';
    faUser = faUser;
    faEnvelope = faEnvelope;
    faLock = faLock;
    passIcon = faEyeSlash;
    passInputType: string = "password";

    protected signupForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    }); 

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
        this.logMsg = '';
        this.errMsg = '';
    }

    onSubmit(): void {
        if (this.signupForm.valid){
            this.authService.signup(this.signupForm.value).subscribe((data: any) => {
                    this.router.navigate(['/user/signin']);
                }, err => {
                    this.errMsg = `Erreur : ${err}`;
                    console.log({ err });
                }
            );
        }
    }
}