import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "./material.modules";
import {AppRouting} from "./app.routing";
import {LoginComponent} from "./login/login.component";
import {CookieService} from "ngx-cookie-service";

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
        LoginComponent
    ],
    bootstrap: [AppComponent],
    providers: [CookieService],
    entryComponents: [
    ]
})
export class AppModule { }
