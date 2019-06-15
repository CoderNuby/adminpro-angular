import { NgModule } from '@angular/core';

//Componetes
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
    declarations:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent
    ],
    exports:[
        HeaderComponent,
        BreadcrumbsComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ]
})
export class SharedModule{

}