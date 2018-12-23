import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {DataPoint} from "../domain/DataPoint";
import * as $ from 'jquery';
import {DateFormatPipe} from "../pipe/DateFormatPipe";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    public dataPoints: DataPoint[];

    public view: number[] = [700, 400];

    colorScheme = {
        domain: ['#5AA454', '#A10A28']
    };

    public results: any[] = [];

    constructor(private authService: AuthenticationService, private router: Router, private statisticsService: StatisticsService,
                private dateFormatPipe: DateFormatPipe) {
    }

    ngOnInit() {
        this.authService.checkCredentials();

        this.statisticsService.getCurrentAccountStatistics().subscribe(results => {
            let incomeResults: any[] = [];
            let expensesResults: any[] = [];

            results.forEach(result => {
                let date = this.dateFormatPipe.transform(result.id.date);

                incomeResults.push({
                    name: date,
                    value: result.statistics["INCOMES_AMOUNT"]
                });

                expensesResults.push({
                    name: date,
                    value: result.statistics["EXPENSES_AMOUNT"]
                });

            });

            this.results = [
                {
                    name: 'Incomes',
                    series: incomeResults
                },
                {
                    name: 'Expenses',
                    series: expensesResults
                }
            ];

        });
    }

    public logout() {
        this.authService.logout();
    }

    public navigateToAccount() {
        this.router.navigate(['/account']);
    }

}
