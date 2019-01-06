import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
export class AccountTroubleComponent implements OnInit, AfterViewInit {

    public flip: String;

    public forgotPassword: FormGroup;
    public resendEmail: FormGroup;

    public showSection: Boolean = false;

    private windowHeight: number;
    private scrollPosition: number;

    constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
        this.flip = 'inactive';

        this.forgotPassword = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.resendEmail = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
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

    onForgotPasswordSubmit() {

    }

    onResendEmailSubmit() {

    }

    toggleFlip() {
        this.flip = (this.flip === 'inactive') ? 'active' : 'inactive';
    }

    private checkShowSection() {
        if (this.windowHeight * 4.5 <= this.scrollPosition) {
            this.showSection = true;
        }
    }

}
