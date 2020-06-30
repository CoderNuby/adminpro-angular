import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
//
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

const pagesRoutes: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', contenido: 'Pagina donde se muestra el progreso'} },
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', contenido: 'Pagina principal de la aplicacion web'}},
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', contenido: 'Mustra algunas graficas'}},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', contenido: ''}},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', contenido: ''}},
            { path: 'account-settings', component: AccoutSettingsComponent},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
            //Mantenimiento
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'mantenimiento de usuarios'}},
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'mantenimiento de medicos'}},
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'mantenimiento de hospitales'}},
            { path: '', redirectTo:'/dashboard', pathMatch: 'full'}
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );