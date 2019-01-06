import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-social-media-connection',
    templateUrl: './social-media-connection.component.html',
    styleUrls: ['./social-media-connection.component.css'],
    animations: [
        trigger('showSocial', [
            state('true', style({opacity: 1, transform: 'translateY(0%)'})),
            state('false', style({opacity: 0, transform: 'translateY(25%)'})),
            transition('false => true', animate('1s 2s ease-in'))
        ])
    ]
})
export class SocialMediaConnectionComponent implements OnInit, AfterViewInit {

    public showSection: Boolean = false;

    private windowHeight: number;
    private scrollPosition: number;

    constructor(private cdr: ChangeDetectorRef) {
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

    private checkShowSection() {
        if (this.windowHeight * 4.5 <= this.scrollPosition) {
            this.showSection = true;
        }
    }

}
