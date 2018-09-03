import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
    selector: 'app-income-dialog',
    templateUrl: './income-dialog.component.html',
    styleUrls: ['./income-dialog.component.css']
})
export class IncomeDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<IncomeDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: String) {
    }

    onCloseClick(): void {
        this.data = "Bye";
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}
