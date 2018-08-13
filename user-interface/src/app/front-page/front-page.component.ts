import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.css'],
    animations: [
        trigger('showMessage1', [
            state('show', style({opacity: 1})),
            state('hide', style({opacity: 0})),
            transition('hide => show', animate(1000))
        ]),
        trigger('showMessage2', [
            state('show', style({opacity: 1})),
            state('hide', style({opacity: 0})),
            transition('hide => show', animate('1s 1s ease-in'))
        ]),
        trigger('showSection1', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1s 1.5s ease-in'))
        ]),
        trigger('showSection2', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1s 2s ease-in'))
        ]),
        trigger('showSection3', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1s 0.5s ease-in'))
        ]),
        trigger('showSection4', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1s 1s ease-in'))
        ]),
        trigger('showSection5', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1s 2s ease-in'))
        ])
    ]
})
export class FrontPageComponent implements OnInit, AfterViewInit {
    private windowHeight: number;
    private scrollPosition: number;

    public headerState: String = "hide";
    public beTheFirstSection: String = "hide";
    public mainInfoSection: String = "hide";
    public pricingSection: String = "hide";

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight;
    }

    ngAfterViewInit(): void {
        this.scrollPosition = window.pageYOffset;

        this.showHeader();
        this.showBeTheFirstSection();
        this.showMainInfoSection();
        this.showPricingSection();

        this.cdr.detectChanges();
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.scrollPosition = window.pageYOffset;

        this.showHeader();
        this.showBeTheFirstSection();
        this.showMainInfoSection();
        this.showPricingSection();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.scrollPosition = window.pageYOffset;
        this.windowHeight = window.innerHeight;

        this.showHeader();
        this.showBeTheFirstSection();
        this.showMainInfoSection();
        this.showPricingSection();
    }

    private showHeader() {
        if (this.isScrollPositionBetweenWindowSeize(0.0, 0.5)) {
            this.headerState = 'show';
        }
    }

    private showBeTheFirstSection() {
        if (this.isScrollPositionBetweenWindowSeize(0.5, 1.5)) {
            this.beTheFirstSection = 'show';
        }
    }

    private showMainInfoSection() {
        if (this.isScrollPositionBetweenWindowSeize(1.5, 2.5)) {
            this.mainInfoSection = 'show';
        }
    }

    private showPricingSection() {
        if (this.isScrollPositionBetweenWindowSeize(3, 4)) {
            this.pricingSection = 'show';
        }
    }

    private isScrollPositionBetweenWindowSeize(ratio1: number, ratio2: number): boolean {
        return this.windowHeight * ratio1 <= this.scrollPosition && this.scrollPosition <= this.windowHeight * ratio2;
    }

}
