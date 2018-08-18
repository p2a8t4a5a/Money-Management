import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FrontPageComponent} from "./front-page/front-page.component";
import {AccountComponent} from "./account/account.component";

const APP_ROUTES: Routes = [
    {path: '', component: FrontPageComponent},
    {path: 'account', component: AccountComponent}
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
