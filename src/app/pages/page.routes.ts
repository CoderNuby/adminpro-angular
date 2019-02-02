import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'progress', component: ProgressComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
            { path: 'account-settings', component: AccoutSettingsComponent}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );