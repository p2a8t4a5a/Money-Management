import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../domain/User';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatSnackBar} from "@angular/material";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
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
        ]),
        trigger('showBar', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 1s ease-in'))
        ]),
        trigger('showSocial', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 2s ease-in'))
        ])
    ]
})
export class LoginComponent implements OnInit, AfterViewInit {
    public hidePassword1: Boolean;
    public hidePassword2: Boolean;
    public hidePassword3: Boolean;

    public flip: String;

    public loginForm: FormGroup;
    public createAccountForm: FormGroup;

    public matcher: PasswordErrorStateMatcher;

    public showSection: Boolean = false;

    private windowHeight: number;
    private scrollPosition: number;

    constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private cdr: ChangeDetectorRef,
                private authService: AuthenticationService) {

        this.flip = 'inactive';
        this.hidePassword1 = true;
        this.hidePassword2 = true;
        this.hidePassword3 = true;
        this.matcher = new PasswordErrorStateMatcher();

        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
        });

        this.createAccountForm = fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            repeatPassword: ['']
        }, {validator: this.checkPasswords});
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight;
    }

    ngAfterViewInit(): void {
        this.scrollPosition = window.pageYOffset;
        this.checkShowSection();
        this.cdr.detectChanges();
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.scrollPosition = window.pageYOffset;
        this.checkShowSection();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.scrollPosition = window.pageYOffset;
        this.windowHeight = window.innerHeight;

        this.checkShowSection();
    }

    onSubmitCreateAccount() {
        let user = new User();
        user.username = this.createAccountForm.controls.email.value;
        user.password = this.createAccountForm.controls.password.value;

        this.authService.createUser(user).subscribe(
            data => this.authService.obtainAccessToken(user),
            error => this.displayMessage(error.message));

    }

    onSubmitLogin() {
        // TODO
    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

    checkPasswords(group: FormGroup) {
        let pass = group.controls.password.value;
        let confirmPass = group.controls.repeatPassword.value;

        return pass === confirmPass ? null : {notSame: true}
    }

    private checkShowSection() {
        if (this.windowHeight * 4.5 <= this.scrollPosition) {
            this.showSection = true;
        }
    }

    private displayMessage(message: String) {
        //TODO
    }

}

class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
        const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

        return (invalidCtrl || invalidParent);
    }
}