import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule, MatSnackBarModule
} from "@angular/material";
import {MatButtonModule} from "@angular/material/typings/button";
import {MatCardModule} from "@angular/material/typings/esm5/card";
import {MatChipsModule} from "@angular/material/typings/chips";
import {MatDialogModule} from "@angular/material/typings/dialog";
import {MatIconModule} from "@angular/material/typings/icon";
import {MatInputModule} from "@angular/material/typings/input";
import {MatListModule} from "@angular/material/typings/list";
import {MatMenuModule} from "@angular/material/typings/menu";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/typings/esm5/core";
import {MatRadioModule} from "@angular/material/typings/radio";
import {MatSelectModule} from "@angular/material/typings/select";
import {MatSidenavModule} from "@angular/material/typings/sidenav";
import {MatSliderModule} from "@angular/material/typings/slider";
import {MatSortModule} from "@angular/material/typings/sort";
import {MatTableModule} from "@angular/material/typings/table";
import {MatTabsModule} from "@angular/material/typings/tabs";
import {MatToolbarModule} from "@angular/material/typings/toolbar";
import {MatTooltipModule} from "@angular/material/typings/tooltip";
import {MatStepperModule} from "@angular/material/typings/stepper";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        FormsModule,
        MatSnackBarModule,
        HttpClientModule,
        CommonModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent}
        ])
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
