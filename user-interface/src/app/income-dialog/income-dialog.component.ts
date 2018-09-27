import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Item} from "../domain/Item";

@Component({
    selector: 'app-income-dialog',
    templateUrl: './income-dialog.component.html',
    styleUrls: ['./income-dialog.component.css']
})
export class IncomeDialogComponent implements OnInit {

    item: Item = new Item();

    constructor(
        public dialogRef: MatDialogRef<IncomeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: String) {
    }

    ngOnInit() {
        this.item.currency = 'EUR';
        this.item.period = 'MONTH';
        this.item.amount = '0';
    }

    onCloseClick(): void {
        this.data = "Bye";
        this.dialogRef.close();
    }

    onAddClick() {
        //TODO
    }

}
