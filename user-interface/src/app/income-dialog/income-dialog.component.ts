import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {Item} from "../domain/Item";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    selector: 'app-income-dialog',
    templateUrl: './income-dialog.component.html',
    styleUrls: ['./income-dialog.component.css']
})
export class IncomeDialogComponent implements OnInit {

    item: Item = new Item();

    constructor(
        public dialogRef: MatDialogRef<IncomeDialogComponent>, private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.authService.checkCredentials();
        this.initItem()
    }

    onCloseClick(): void {
        this.dialogRef.close();
    }

    onAddClick() {
        //TODO
    }

    private initItem() {
        this.item.currency = 'EUR';
        this.item.period = 'MONTH';
        this.item.amount = '0';
    }

}
