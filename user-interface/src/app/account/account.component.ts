import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    constructor(private authService: AuthenticationService, private router: Router) {
    }

    ngOnInit() {
        // this.authService.checkCredentials();
    }

    public navigateToStatistics() {
        this.router.navigate(['/statistics'])
    }

}
