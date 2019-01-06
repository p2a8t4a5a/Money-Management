import { ChangeDetectorRef, Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountSection} from "../account-section";

@Component({
    selector: 'app-account-trouble',
    templateUrl: './account-trouble.component.html',
    styleUrls: ['./account-trouble.component.css'],
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
    ]
})
export class AccountTroubleComponent extends AccountSection{

    public flip: String;

    public forgotPassword: FormGroup;
    public resendEmail: FormGroup;

    constructor(private formBuilder: FormBuilder, cdr: ChangeDetectorRef) {
        super(cdr);

        this.flip = 'inactive';

        this.forgotPassword = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.resendEmail = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onForgotPasswordSubmit() {

    }

    onResendEmailSubmit() {

    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

}
