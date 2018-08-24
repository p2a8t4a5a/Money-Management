import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    constructor(private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
    }

    public logout() {
        this.authService.logout();
    }

}
