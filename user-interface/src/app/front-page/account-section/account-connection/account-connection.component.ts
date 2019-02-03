import {ChangeDetectorRef, Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../../../domain/User';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../service/authentication.service";
import {ToastrService} from "ngx-toastr";
import {AccountSection} from "../account-section";
import {PasswordErrorStateMatcher} from "../../../util/password-error-state-matcher";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account-connection',
    templateUrl: './account-connection.component.html',
    styleUrls: ['./account-connection.component.css'],
    animations: [
        trigger('flipState', [
            state('active', style({
                transform: 'rotateY(179.9deg)'
            })),
            state('inactive', style({
                transform: 'rotateY(0)'
            })),
            transition('active => inactive', animate('1000ms ease-out')),
            transition('inactive => active', animate('1000ms ease-in'))
        ]),
        trigger('showLogin', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('false => true', [animate('1s 0.5s ease-in')])
        ])
    ]
})
export class AccountConnectionComponent extends AccountSection {
    public hidePassword1: Boolean;
    public hidePassword2: Boolean;
    public hidePassword3: Boolean;

    public flip: String;

    public loginForm: FormGroup;
    public createAccountForm: FormGroup;

    public matcher: PasswordErrorStateMatcher;

    constructor(private fb: FormBuilder,
                private authService: AuthenticationService,
                private router: Router,
                toaster: ToastrService,
                cdr: ChangeDetectorRef) {

        super(cdr, toaster);

        this.checkIfUserISLogin();
        this.initVariables();
        this.initForms();
    }

    onSubmitCreateAccount() {
        let user = new User();
        user.username = this.createAccountForm.controls.email.value;
        user.password = this.createAccountForm.controls.password.value;

        this.authService.createUser(user).subscribe(
            () => this.displaySuccessMessage("The user was created successfully ! \n \n A verification email has been sent to you, " +
                "please confirm it before to login !"),
            error => this.displayErrorMessage(error.error.message));

    }

    onSubmitLogin() {
        let user = new User();
        user.username = this.loginForm.controls.email.value;
        user.password = this.loginForm.controls.password.value;

        console.log(this.loginForm.controls.rememberMe.value);

        this.authService.obtainAccessToken(user).subscribe(
            data => this.authService.saveCredentials(data, user.username, this.loginForm.controls.rememberMe.value),
            error => this.displayErrorMessage(error.error.error_description))
    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

    checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.repeatPassword.value;

        return pass === confirmPass ? null : {notSame: true}
    }

    private initVariables() {
        this.flip = 'inactive';
        this.hidePassword1 = true;
        this.hidePassword2 = true;
        this.hidePassword3 = true;
        this.matcher = new PasswordErrorStateMatcher();
    }

    private initForms() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            rememberMe: [false]
        });

        this.createAccountForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            repeatPassword: ['']
        }, {validator: this.checkPasswords});
    }

    private checkIfUserISLogin() {
        if (this.authService.isUserLogin()) {
            this.router.navigate(['/statistics'])
        }
    }

}