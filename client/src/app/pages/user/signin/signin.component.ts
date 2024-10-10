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
    styleUrl: './signin.component.scss'
})
export class SigninComponent {
    authService = inject(AuthService);
    router = inject(Router);
    trPath = "pages.signIn";

    logMsg: string = '';
    errMsg: string = '';
    email: string = '';
    password: string = '';
    faUser = faUser;
    faLock = faLock;
    passIcon = faEyeSlash;
    passInputType: string = "password";

    protected signinForm: FormGroup = new FormGroup({
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
        if (this.signinForm.valid){
            console.log(this.signinForm.value);
            this.authService.signin(this.signinForm.value).subscribe((data: any) => {
                    if(this.authService.isLoggedIn()){
                        this.router.navigate(['/admin']);
                    }
                    console.log(data);
                }, err => {
                    this.errMsg = "Erreur. Le message n'a pas été envoyé."
                    console.log({ err });
                }
            );
        }
    }
}