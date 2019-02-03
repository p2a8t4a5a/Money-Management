import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AccountSection} from "./account-section";

@Component({
  selector: 'app-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.css'],
  animations : [
    trigger('showBar', [
      state('true', style({opacity: 1, transform: 'translateY(0%)'})),
      state('false', style({opacity: 0, transform: 'translateY(25%)'})),
      transition('false => true', animate('1s 1s ease-in'))
    ])
  ]
})
export class AccountSectionComponent extends AccountSection {

}
