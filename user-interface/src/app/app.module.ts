import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: 'login', component: LoginComponent}
        ])
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
