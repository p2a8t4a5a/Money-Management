import {AfterViewInit, ChangeDetectorRef, HostListener, OnInit} from "@angular/core";
import {ToastrService} from "ngx-toastr";

export class AccountSection implements OnInit, AfterViewInit {
    public showSection: Boolean = false;

    private windowHeight: number;
    private scrollPosition: number;

    constructor(private cdr: ChangeDetectorRef, public toaster: ToastrService) {
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

    displaySuccessMessage(message: string) {
        this.toaster.success(message, 'Success');
    }

    displayErrorMessage(message: string) {
        this.toaster.error(message, 'Error');
    }

    private checkShowSection() {
        if (this.windowHeight * 4.5 <= this.scrollPosition) {
            this.showSection = true;
        }
    }

}

