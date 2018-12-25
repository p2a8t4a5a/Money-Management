import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {DataPoint} from "../domain/DataPoint";
import {DateFormatPipe} from "../pipe/DateFormatPipe";
import {ItemMetric} from "../domain/ItemMetric";

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
    public incomesPieChartResults: any[] = [];
    public expensePieChartResults: any[] = [];

    constructor(private authService: AuthenticationService, private router: Router, private statisticsService: StatisticsService,
                private dateFormatPipe: DateFormatPipe) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.statisticsService.getCurrentAccountStatistics().subscribe(results => this.populateCharts(results));
    }

    public logout() {
        this.authService.logout();
    }

    public navigateToAccount() {
        this.router.navigate(['/account']);
    }

    private populateCharts(results: DataPoint[]) {
        let incomeResults: any[] = [];
        let expensesResults: any[] = [];
        let incomesPieChartResults: Map<String, number> = new Map();
        let expensesPieChartResults: Map<String, number> = new Map();

        results.forEach(result => {
            this.extractLineChartData(result, incomeResults, expensesResults);
            this.extractPieChartData(incomesPieChartResults, result.incomes);
            this.extractPieChartData(expensesPieChartResults, result.expenses);
        });

        this.lineChartResults = this.getLineChartData(incomeResults, expensesResults);
        this.incomesPieChartResults = this.getPieChartData(incomesPieChartResults);
        this.expensePieChartResults = this.getPieChartData(expensesPieChartResults);
    }

    private extractPieChartData(pieChartResults: Map<String, number>, items: Set<ItemMetric>) {
        items.forEach(income => {
            if (pieChartResults.has(income.title)) {
                let newAmount = pieChartResults.get(income.title) + Math.trunc(income.amount);
                pieChartResults.set(income.title, newAmount);
            } else {
                pieChartResults.set(income.title, Math.trunc(income.amount));
            }
        });
    }

    private extractLineChartData(result: DataPoint, incomeResults: any[], expensesResults: any[]) {
        let date = this.dateFormatPipe.transform(result.id.date);

        incomeResults.push({
            name: date,
            value: result.statistics["INCOMES_AMOUNT"]
        });

        expensesResults.push({
            name: date,
            value: result.statistics["EXPENSES_AMOUNT"]
        });
    }

    private getLineChartData(incomeResults: any[], expensesResults: any[]): any[] {
        return [
            {
                name: 'Incomes',
                series: incomeResults
            },
            {
                name: 'Expenses',
                series: expensesResults
            }
        ];
    }

    private getPieChartData(pieChartResults: Map<String, number>): any[] {
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

        return pieChartResultsArray;
    }


}
