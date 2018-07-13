import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [
        trigger('animation', [
            transition('createAccount <=> login', [
                style({transform: 'rotateY(180deg)'}),
                animate(500)
            ])
        ])
    ]
})
export class LoginComponent implements OnInit {
    public loginData = {username: '', password: ''};

    public state = 'login';

    constructor() {
    }

    ngOnInit() {
    }

    onSubmitCreateAccount() {
        //TODO
    }

    onSubmitLogin() {
        //TODO
    }

    login() {
        this.state = 'login';
    }

    createAccount() {
        this.state = 'createAccount';
    }

}
