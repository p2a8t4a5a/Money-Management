import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {DataPoint} from "../domain/DataPoint";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    public dataPoints: DataPoint[];

    constructor(private authService: AuthenticationService, private router: Router, private statisticsService: StatisticsService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();

        this.statisticsService.getCurrentAccountStatistics().subscribe(result => {
            this.dataPoints = result;
        });
    }

    public logout() {
        this.authService.logout();
    }

    public navigateToAccount() {
        this.router.navigate(['/account']);
    }

}
