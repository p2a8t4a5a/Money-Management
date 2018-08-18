import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
    }

}
