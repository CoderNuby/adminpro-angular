import { NgModule } from '@angular/core';

//Componetes
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


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
        CommonModule
    ]
})
export class SharedModule{

}