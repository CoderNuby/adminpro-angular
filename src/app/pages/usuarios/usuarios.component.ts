import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService, ModalUploadImagenService } from '../../services/service.index';

//sweetAlert-Import
import swal from 'sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];

  desde: number = 0;

  totalRegistros: number;//Automatizar el total de usuarios

  registrosPerPages: number = 3;


  cargando: boolean = true;

  
  imagenTemporal:any;
  imagenSubir: File;

  editingNombre: boolean = false;
  editingCorreo: boolean = false;


  constructor( 
    private _usuarioService: UsuarioService,
    private _modalServices: ModalUploadImagenService
    ) {
    console.log("Valor: ", this.desde);
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde, this.registrosPerPages).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegistros = resp.totalUsuarios;
      console.log("Usuarios totales: "+this.totalRegistros);
      this.cargando = false;
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
    
    this._modalServices.notificar.subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde, this.registrosPerPages).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      console.log("Usuarios: ",this.usuarios);
      this.totalRegistros = resp.totalUsuarios;
      this.cargando = false;
    });
  }

  cambiarPagina($event){
    this.desde = $event;
    if(this.desde < 0){
      this.desde = 0;
    }
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ){
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[] )=> {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ){
    swal({
      title: "¿Seguro que desea borrar el usuario "+usuario.email,
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((resp: Usuario)=> {
          swal("Usuario "+usuario.email+" borrado correctamente", {
            icon: "success",
          });
          this.cargarUsuarios();
        });
      } else {
        swal("Accion calcelada");
      }
    });
  }

  editarImagen(id: string){
    this._modalServices.mostartModal(true, 'usuarios', id);
  }

  actualizarUsuario(usuario: Usuario){
    swal({
      title: "¿Seguro que desea actualizar el usuario "+usuario.email,
      icon: "warning",
      buttons: ["Cancelar", true],
      dangerMode: true,
    })
    .then((update) => {
      if (update) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe((resp: Usuario)=> {
          swal("Usuario "+usuario.email+" Actualizado correctamente", {
            icon: "success",
          });
          this.cargarUsuarios();
        });
      } else {
        swal("Accion calcelada");
        this.cargarUsuarios();
      }
    });
  }
}
