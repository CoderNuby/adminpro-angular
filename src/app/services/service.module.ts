import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginGuardGuard, SettingsService,SharedService, SidebarService, UsuarioService, SubirArchivoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


//Servicios


@NgModule({
  declarations: [],
  providers: [
    UsuarioService,
    SettingsService,
    SharedService,
    SidebarService,
    LoginGuardGuard,
    SubirArchivoService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class ServiceModule { }
