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
    public hidePassword: Boolean;
    public flip: String;
    public loginForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.user = new User();
        this.repeatPassword = '';
        this.flip = 'inactive';
        this.hidePassword = true;

        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(64)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
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
