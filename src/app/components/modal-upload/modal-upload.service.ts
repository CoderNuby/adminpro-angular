import { Injectable, EventEmitter } from '@angular/core';


import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public coleccion: string;
  public id: string;

  public oculto: string = '';

  public notificacion = new EventEmitter<any>();

  constructor(public _usuarioComponent: UsuariosComponent) { 
    console.log('Modal upload service');
  }
  ocultarModal(){

  }
  mostrarModal(){
    
  }
}

