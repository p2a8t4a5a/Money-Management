import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../domain/User';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
        ])
    ]
})
export class LoginComponent implements OnInit {
    public user: User;
    public repeatPassword: String;
    public hidePassword1: Boolean;
    public hidePassword2: Boolean;
    public hidePassword3: Boolean;
    public flip: String;
    public loginForm: FormGroup;
    public createAccountForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.user = new User();
        this.repeatPassword = '';
        this.flip = 'inactive';
        this.hidePassword1 = true;
        this.hidePassword2 = true;
        this.hidePassword3 = true;

        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
        });

        this.createAccountForm = fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            repeatPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
        });
    }

    ngOnInit() {
    }

    onSubmitCreateAccount() {
        // TODO
    }

    onSubmitLogin() {
        // TODO
    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

}
