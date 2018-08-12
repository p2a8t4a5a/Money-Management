import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit} from '@angular/core';
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
            transition('hide => show', animate('1.5s 1.5s ease-in'))
        ]),
        trigger('showSection2', [
            state('show', style({opacity: 1, transform: 'translateY(0%)'})),
            state('hide', style({opacity: 0, transform: 'translateY(100%)'})),
            transition('hide => show', animate('1.5s 2s ease-in'))
        ])
    ]
})
export class FrontPageComponent implements OnInit, AfterViewInit {
    private windowHeight: number;
    private scrollPosition: number;

    public headerState: String = "hide";
    public beTheFirstSection: String = "hide";

    constructor(private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.windowHeight = window.innerHeight;
    }

    ngAfterViewInit(): void {
        this.scrollPosition = window.pageYOffset;

        this.showHeader();
        this.showBeTheFirstSection();

        this.cdr.detectChanges();
    }

    @HostListener('window:scroll', ['$event'])
    checkScroll() {
        this.scrollPosition = window.pageYOffset;

        this.showHeader();
        this.showBeTheFirstSection();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.scrollPosition = window.pageYOffset;
        this.windowHeight = window.innerHeight;

        this.showHeader();
        this.showBeTheFirstSection();
    }

    private showHeader() {
        if (this.scrollPosition < this.windowHeight * 0.5) {
            this.headerState = 'show';
        }
    }

    private showBeTheFirstSection() {
        if (this.windowHeight * 0.5 < this.scrollPosition && this.scrollPosition < this.windowHeight * 1.5) {
            this.beTheFirstSection = 'show';
        }
    }

}
