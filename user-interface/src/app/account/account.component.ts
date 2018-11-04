import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material";
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";
import {AccountService} from "../service/account.service";
import {Account} from "../domain/Account";
import {Item} from "../domain/Item";
import {ToastrService} from "ngx-toastr";
import * as $ from 'jquery';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    public account: Account;

    constructor(private authService: AuthenticationService, private router: Router, public dialog: MatDialog,
                private accountService: AccountService, private toaster: ToastrService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.accountService.getCurrentAccount().subscribe(result => {
            this.account = result;
        })
    }

    public navigateToStatistics() {
        this.router.navigate(['/statistics'])
    }

    public openUpdateIncome(index: number) {
        this.openItemPopup(this.account.incomes[index]).afterClosed().subscribe(result => {
            if (result != null) {
                this.account.incomes[index] = result;
            }
        });
    }

    public openUpdateExpense(index: number) {
        this.openItemPopup(this.account.expenses[index]).afterClosed().subscribe(result => {
            if (result != null) {
                this.account.expenses[index] = result;
            }
        });
    }

    public openAddIncome() {
        this.openItemPopup(null).afterClosed().subscribe(result => {
            if (result != null) {
                this.account.incomes.push(result);
            }
        });
    }

    public openAddExpense() {
        this.openItemPopup(null).afterClosed().subscribe(result => {
            if (result != null) {
                this.account.expenses.push(result);
            }
        });
    }

    public saveAccount() {
        this.accountService.saveAccount(this.account).subscribe(() => {
                this.toaster.success('The account was successfully saved !', 'Success');
            },
            error => {
                this.toaster.error('An error occur during the saving !', 'Error');
            });
    }

    public incomeDown() {
        AccountComponent.down("income");
    }

    public incomeUp() {
        AccountComponent.up("income");
    }

    private static up(id: String) {
        var slider = $("#" + id + "slider");
        var sliderOffset = $(slider).position().top;
        var itemHeight = 70;
        var scroll = Math.abs(sliderOffset) + itemHeight;

        $('#' + id + 'frame').animate({
            scrollTop: scroll
        }, 'slow');
    }

    private static down(id: String) {
        var slider = $("#" + id + "slider");
        var sliderOffset = $(slider).position().top;
        var itemHeight = 70;

        if (sliderOffset < 0) {
            var lastElementOnScreen = Math.abs(Math.round(sliderOffset / itemHeight)) - 1;

            $('#' + id + 'frame').animate({
                scrollTop: lastElementOnScreen * itemHeight
            }, 'slow');
        }
    }

    private openItemPopup(item: Item): MatDialogRef<ItemDialogComponent, any> {
        return this.dialog.open(ItemDialogComponent, {
            width: '250px',
            data: item
        });
    }

}
