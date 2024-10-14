import { Component, inject } from '@angular/core';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TranslocoModule } from '@ngneat/transloco';

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
    authService = inject(AuthService);
    trPath = "pages.signIn";

    logMsg: string = '';
    errMsg: string = '';
    email: string = '';
    password: string = '';
    faUser = faUser;
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
        this.isSubmitted = true;

        if (this.signinForm.valid){
            this.authService.signin(this.signinForm.value).subscribe({
                next: () => {
                    if(this.authService.isLoggedIn()){
                        this.router.navigate(['/admin']);
                    }
                }, 
                error: err => {
                    this.errMsg = `Erreur: ${err.msg}`;
                    console.log({ err });
                }
            });
        }
    }
}