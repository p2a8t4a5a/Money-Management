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

    private animatecircle(beforevalue, aftervalue, sum, title) {
        var before = (100 * beforevalue / sum),
            after = (100 * aftervalue / sum),
            R = $(this).data("width") / 2,
            alpha = (after * 0.02 * Math.PI),	// percent to radians
            n = 10,								// margin from circle
            id = $(this).attr("id"),
            $this = $(this),
            ycord, xcord, animatetime;

        // Set font size
        (function () {
            var fontpx;
            if (id == "outer-circle") {
                if (sum - aftervalue < 999999) {
                    fontpx = 48
                } else if (sum - aftervalue < 9999999) {
                    fontpx = 37
                } else {
                    fontpx = 22
                }
            } else {
                if (aftervalue < 99999) {
                    fontpx = 31
                } else if (aftervalue < 999999) {
                    fontpx = 27
                } else {
                    fontpx = 18
                }
            }
            $("#" + id + "-value").css({"font-size": fontpx + "px"})
        })();

        // Percent value location
        if (after <= 25) {
            ycord = Math.round(R + (n / 2) - (R * Math.sin(1.57 - alpha)));
            xcord = Math.round(R + (n) + (R * Math.cos(1.57 - alpha)));
            animatetime = 500;
        } else if (after <= 50) {
            ycord = Math.round(R + (n / 2) + (R * Math.sin(alpha - 1.57)));
            xcord = Math.round(R + (n * 2) + (R * Math.cos(alpha - 1.57)));
            animatetime = 1400;
        } else if (after <= 75) {
            ycord = Math.round(R - (n * 2) + (R * Math.sin(alpha - 1.57)));
            xcord = Math.round(R - (n * 4) + (R * Math.cos(alpha - 1.57)));
            animatetime = 1500;
        } else {
            ycord = Math.round(R + (-n * 3) - (R * Math.sin(1.57 - alpha)));
            xcord = Math.round(R + (-n * 3) + (R * Math.cos(1.57 - alpha)));
            animatetime = 1600;
        }

        // Set and show percent value next to cursor
        $("#" + id + "-percent").hide();
        $("#" + id + "-percent").empty().append('<span class="lightcircletitle">' + Math.round(after) + '%</span>');
        setTimeout(function () {
            $("#" + id + "-percent").css({"left": xcord, "top": ycord}).fadeIn(400)
        }, animatetime - 200);

        // Animate circle with its cursor
        $({value: before}).animate({value: after}, {
            duration: animatetime,
            easing: 'swing',
            step: function () {
                $this.val(this.value).trigger('change');
                $("#" + id + "-cursor").val(this.value).trigger('change');
            }
        });

        // Set precision value
        (function () {
            if (id == "outer-circle") {
                $("#" + id + "-value").html(this.separateNumber(Math.abs(Math.round((sum - aftervalue) / 10) * 10)));
            } else {
                $("#" + id + "-value").html(this.separateNumber(aftervalue));
                $("#" + id + "-title").html(title);
            }
        })();
    }

    private simpleanimatecircle(before, after, duration) {
        var $this = $(this);
        $({ value: before }).animate({ value: after }, {
            duration: duration,
            easing: 'swing',
            step: function () {
                $this.val(this.value).trigger('change');
            }
        });
    }

    private separateNumber(val) {
        if (Math.abs(val) > 999) {
            val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 <span class="lightcircletitle">');
        } else {
            val = val.toString().replace(/(\.)/g, '<span class="lightcircletitle">$1');
        }
        return val;
    };

}
