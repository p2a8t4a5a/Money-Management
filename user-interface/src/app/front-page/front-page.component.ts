import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-front-page',
    templateUrl: './front-page.component.html',
    styleUrls: ['./front-page.component.css'],
    animations: [
        trigger('showMessage1', [
            transition('void => *', [
                style({opacity: 0}),
                animate(1000)
            ])
        ]),
        trigger('showMessage2', [
            transition('void => *', [
                style({opacity: 0}),
                animate('1s 1s ease-in')
            ])
        ]),
        trigger('showLearnMore', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateY(100%) scale(1)'}),
                animate('1.5s 1.5s ease-in')
            ])
        ]),
        trigger('showSingUp', [
            transition('void => *', [
                style({opacity: 0, transform: 'translateY(100%) scale(1)'}),
                animate('1.5s 2s ease-in')
            ])
        ])
    ]
})
export class FrontPageComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
