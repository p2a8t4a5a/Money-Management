import {Component, OnInit} from '@angular/core';
import {MatSnackBarRef} from "@angular/material";

@Component({
    selector: 'app-snack-bar',
    templateUrl: './snack-bar.component.html',
    styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

    constructor(private snackBarRef: MatSnackBarRef<SnackBarComponent>) {
    }

    close() {
        this.snackBarRef.dismiss();
    }

    ngOnInit(): void {
    }
}
