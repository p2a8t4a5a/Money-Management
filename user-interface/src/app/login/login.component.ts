import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
    public loginData = {username: '', password: ''};

    flip: string = 'inactive';

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

    toggleFlip() {
        this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
    }

}
