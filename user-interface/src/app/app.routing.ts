import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from "./login/login.component";

const APP_ROUTES: Routes = [
    {path: '', component: LoginComponent}
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
