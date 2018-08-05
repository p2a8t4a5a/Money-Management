import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material.modules";
import {AppRouting} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {CookieService} from "ngx-cookie-service";
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { FrontPageComponent } from './front-page/front-page.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRouting
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        SnackBarComponent,
        FrontPageComponent
    ],
    bootstrap: [AppComponent],
    providers: [CookieService],
    entryComponents: [
        SnackBarComponent
    ]
})
export class AppModule { }
