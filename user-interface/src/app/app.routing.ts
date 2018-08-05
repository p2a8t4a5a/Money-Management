import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {FrontPageComponent} from "./front-page/front-page.component";

const APP_ROUTES: Routes = [
    {path: '', component: FrontPageComponent}
];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
