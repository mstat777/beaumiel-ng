import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser as faUserSolid, faLock, faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserReg } from '@fortawesome/free-regular-svg-icons';
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

    faUserSolid = faUserSolid;
    faUserReg = faUserReg;
    faEnvelope = faEnvelope;
    faLock = faLock;
    passIcon = faEyeSlash;
    passInputType: string = "password";
    errMsg: string = '';

    isSubmitted: boolean = false;

    nameControl = new FormControl('', [
        Validators.required, 
        Validators.minLength(2),
        Validators.maxLength(40),
        Validators.pattern(/^[a-zàâçéèêëîïôûùüÿñæœ .'-]*$/i)
    ]);

    //lastNameControl = this.firstNameControl;

    emailControl = new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)
    ]);
    passwordControl = new FormControl('', [
        Validators.required, 
        Validators.minLength(8),
        Validators.maxLength(128),
        Validators.pattern(/[a-zA-Z\d]/)
    ]);

    protected signupForm: FormGroup = new FormGroup({
        firstName: this.nameControl,
        lastName: this.nameControl,
        email: this.emailControl,
        password: this.passwordControl
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
    
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.signupForm.valid){
            this.authService.signup(this.signupForm.value).subscribe({
                next: () => this.router.navigate(['/user/signin']), 
                error: err => {
                    this.errMsg = `Erreur : ${err}`;
                    console.log({ err });
                }
            });
        }
    }
}