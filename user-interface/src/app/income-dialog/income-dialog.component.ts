import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Item} from "../domain/Item";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-income-dialog',
    templateUrl: './income-dialog.component.html',
    styleUrls: ['./income-dialog.component.css']
})
export class IncomeDialogComponent implements OnInit {

    public title: String = "Add Income";

    constructor(
        public dialogRef: MatDialogRef<IncomeDialogComponent>, private authService: AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public income: Item) {
    }

    ngOnInit() {
        this.authService.checkCredentials();

        if (this.income == null) {
            this.initItem()
        } else {
            this.title = "Update Income";
        }
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

    onAddClick() {
        //TODO
    }

    private initItem() {
        this.income = new Item();
        this.income.currency = 'EUR';
        this.income.period = 'MONTH';
        this.income.amount = '0';
    }

}
