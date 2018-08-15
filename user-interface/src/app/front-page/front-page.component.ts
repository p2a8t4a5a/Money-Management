import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.css'],
    animations: [
        trigger('showMessage1', [
            state('true', style({opacity: 1})),
            state('false', style({opacity: 0})),
            transition('true => false', animate(1000))
        ]),
        trigger('showMessage2', [
            state('true', style({opacity: 1})),
            state('false', style({opacity: 0})),
            transition('false => true', animate('1s 1s ease-in'))
        ]),
        trigger('showSection1', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(50%)'})),
            transition('false => true', animate('1s 1.5s ease-in'))
        ]),
        trigger('showSection2', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(50%)'})),
            transition('false => true', animate('1s 2s ease-in'))
        ]),
        trigger('showSection3', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 0.5s ease-in'))
        ]),
        trigger('showSection4', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 1s ease-in'))
        ]),
        trigger('showSection5', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 2s ease-in'))
        ])
    ]
})
export class FrontPageComponent implements OnInit, AfterViewInit {
    private windowHeight: number;
    private scrollPosition: number;

    public showHeaderSection: boolean = false;
    public showBeTheFirstSection: boolean = false;
    public showMainInfoSection: boolean = false;
    public showPricingSection: boolean = false;

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight;
    }

    ngAfterViewInit(): void {
        this.scrollPosition = window.pageYOffset;
        this.checkShowSections();
        this.cdr.detectChanges();
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.scrollPosition = window.pageYOffset;
        this.checkShowSections();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.scrollPosition = window.pageYOffset;
        this.windowHeight = window.innerHeight;

        this.checkShowSections();
    }


    private checkShowSections() {
        this.showHeaderSection = this.isScrollPositionBetweenWindowSeize(this.showHeaderSection, 0.0, 0.5);
        this.showBeTheFirstSection = this.isScrollPositionBetweenWindowSeize(this.showBeTheFirstSection, 0.5, 1.5);
        this.showMainInfoSection = this.isScrollPositionBetweenWindowSeize(this.showMainInfoSection, 1.5, 2.5);
        this.showPricingSection = this.isScrollPositionBetweenWindowSeize(this.showPricingSection, 3, 4);
    }

    private isScrollPositionBetweenWindowSeize(currentState: boolean, ratio1: number, ratio2: number): boolean {
        return currentState || (this.windowHeight * ratio1 <= this.scrollPosition && this.scrollPosition <= this.windowHeight * ratio2);
    }

}
