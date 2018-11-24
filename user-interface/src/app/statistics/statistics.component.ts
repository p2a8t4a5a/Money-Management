import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {DataPoint} from "../domain/DataPoint";
import {$} from "jquery";

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

        this.createMainCanvas();
        this.createLittleCanvases();
    }

    public logout() {
        this.authService.logout();
    }

    public navigateToAccount() {
        this.router.navigate(['/account']);
    }

    private createLittleCanvases() {
        let canvas1 = $("#movingcircle-1"),
            canvas2 = $("#movingcircle-2"),
            canvas3 = $("#movingcircle-3"),
            ctx1 = canvas1.getContext('2d'),
            ctx2 = canvas2.getContext('2d'),
            ctx3 = canvas3.getContext('2d'),
            x = canvas1.width / 2,
            y = canvas1.height / 2,
            radius = 99,
            startAngle = Math.PI,
            endAngle = 2.2 * Math.PI,
            counterClockwise = false;

        ctx1.beginPath();
        ctx1.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        ctx1.lineWidth = 3;
        ctx1.strokeStyle = "#f2f2f2";
        ctx1.stroke();

        ctx2.beginPath();
        ctx2.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        ctx2.lineWidth = 3;
        ctx2.strokeStyle = "#f2f2f2";
        ctx2.stroke();

        ctx3.beginPath();
        ctx3.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        ctx3.lineWidth = 3;
        ctx3.strokeStyle = "#f2f2f2";
        ctx3.stroke();
    }

    private createMainCanvas() {
        let canvas = $("#horizontal"),
            currentDate = new Date(),
            currentMonth = currentDate.getMonth(),
            allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let savingsChart = $('#savingschart');

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.canvas.width = savingsChart.width();
            ctx.canvas.height = savingsChart.height();
            for (let i = 0; i < 11; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 1 + i * 22);
                ctx.lineTo(savingsChart.width(), 1 + i * 22);
                ctx.strokeStyle = '#e5e5e5';
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, 0.5 + i * 22);
                ctx.lineTo(savingsChart.width(), 0.5 + i * 22);
                ctx.strokeStyle = '#FFF';
                ctx.stroke();
            }
        }

        for (let i = 0, j = currentMonth; i <= 12; i++, j++) {
            if (j == 12) {
                j = 0
            }
            $("#month" + i).children(".month-name").html(allMonths[j]);
        }
    }

    private drawChartLine(position) {
        let canvas = $('#chartline');
        let savingsChart = $('#savingschart');

        let chartWidth = savingsChart.width(),
            chartHeight = savingsChart.height(),
            segmentWidth = $(".months").width();

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            ctx.canvas.width = savingsChart.width();
            ctx.canvas.height = savingsChart.height();
            ctx.beginPath();
            ctx.moveTo(0, 155);
            ctx.lineTo(savingsChart.width(), position);
            ctx.strokeStyle = '#bed8db';
            ctx.stroke();
        }

        for (let i = 0, j = 12; i < 12; i++, j--) {
            $('#month' + j).css({"height": chartHeight - position - i * 7 - ((i * segmentWidth * (chartHeight - 153 - position)) / chartWidth)});
        }
    }

}
