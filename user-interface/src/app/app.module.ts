import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material.modules";
import {AppRouting} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {CookieService} from "ngx-cookie-service";
import {FrontPageComponent} from './front-page/front-page.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { AccountComponent } from './account/account.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
            timeOut: 10000,
            extendedTimeOut: 10000
        }),
        AppRouting
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        FrontPageComponent,
        AccountComponent,
        StatisticsComponent,
        ItemDialogComponent
    ],
    bootstrap: [AppComponent],
    providers: [CookieService],
    entryComponents: [
        ItemDialogComponent
    ]
})
export class AppModule {
}
