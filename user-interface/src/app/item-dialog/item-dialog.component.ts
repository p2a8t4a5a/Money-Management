import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Item} from "../domain/Item";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-income-dialog',
    templateUrl: './item-dialog.component.html',
    styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {

    public title: String = "Add Item";

    constructor(
        public dialogRef: MatDialogRef<ItemDialogComponent>, private authService: AuthenticationService,
        @Inject(MAT_DIALOG_DATA) public income: Item) {
    }

    ngOnInit() {
        this.authService.checkCredentials();

        if (this.income == null) {
            this.initItem()
        } else {
            this.title = "Update Item";
        }
    }

    onCloseClick(): void {
        this.dialogRef.close(null);
    }

    onAddClick() {
        this.dialogRef.close(this.income);
    }

    private initItem() {
        this.income = new Item();
        this.income.currency = 'EUR';
        this.income.period = 'MONTH';
        this.income.amount = '0';
        this.income.icon = '';
    }

}
