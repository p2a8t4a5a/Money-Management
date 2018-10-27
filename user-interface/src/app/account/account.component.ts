import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material";
import {IncomeDialogComponent} from "../income-dialog/income-dialog.component";
import {AccountService} from "../service/account.service";
import {Account} from "../domain/Account";
import {Item} from "../domain/Item";
import {ToastrService} from "ngx-toastr";

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
        const dialogRef = this.dialog.open(IncomeDialogComponent, {
            width: '250px',
            data: this.account.incomes[index]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.account.incomes[index] = result;
            }
        });
    }

    public openUpdateExpense(income: Item) {
        //TODO
    }

    public openAddIncome() {
        const dialogRef = this.dialog.open(IncomeDialogComponent, {
            width: '250px',
            data: null
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != null) {
                this.account.incomes.push(result);
            }
        });
    }

    public openAddExpense() {
        //TODO
    }

    public saveAccount() {
        this.accountService.saveAccount(this.account).subscribe(() => {
                this.toaster.success('The account was successfully saved !', 'Success');
            },
            error => {
                this.toaster.error('An error occur during the saving !', 'Error');
            });
    }

}
