import {Component, OnInit, ViewChildren} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {User} from '../domain/User';
import {MatSnackBar} from "@angular/material/typings/esm5/snack-bar";

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
    private re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public user: User;
    public repeatPassword: String;

    flip: String = 'inactive';

    constructor(public snackBar: MatSnackBar) {
        this.user = new User();
        this.repeatPassword = '';
    }

    ngOnInit() {
    }

    onSubmitCreateAccount() {
        // TODO
    }

    onSubmitLogin() {
        let regexp = new RegExp(this.re);

        if (!regexp.test(this.user.userName.toString())) {
            this.snackBar.open("Invalid email address !", "OK");
        }

    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

}
