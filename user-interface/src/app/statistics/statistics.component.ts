import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {DataPoint} from "../domain/DataPoint";
import {DateFormatPipe} from "../pipe/DateFormatPipe";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

    public view: number[] = [700, 400];

    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    public lineChartResults: any[] = [];
    public pieChartResults: any[] = [];

    constructor(private authService: AuthenticationService, private router: Router, private statisticsService: StatisticsService,
                private dateFormatPipe: DateFormatPipe) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.statisticsService.getCurrentAccountStatistics().subscribe(results => this.populateLineChart(results));
    }

    public logout() {
        this.authService.logout();
    }

    public navigateToAccount() {
        this.router.navigate(['/account']);
    }

    private populateLineChart(results: DataPoint[]) {
        let incomeResults: any[] = [];
        let expensesResults: any[] = [];

        let pieChartResults: Map<String, number> = new Map();


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


            result.incomes.forEach(income => {

                if (pieChartResults.has(income.title)) {
                    let newAmount = pieChartResults.get(income.title) + Math.trunc(income.amount);
                    pieChartResults.set(income.title, newAmount);
                } else {
                    pieChartResults.set(income.title, Math.trunc(income.amount));
                }
            });

        });

        this.lineChartResults = [
            {
                name: 'Incomes',
                series: incomeResults
            },
            {
                name: 'Expenses',
                series: expensesResults
            }
        ];

        let index = 0;
        let pieChartResultsArray = [];

        pieChartResults.forEach((v, k) => {

            if (index < 4) {
                pieChartResultsArray.push({
                    "name": k,
                    "value": v
                })
            }

            index++;
        });

        this.pieChartResults = pieChartResultsArray;
    }

}
