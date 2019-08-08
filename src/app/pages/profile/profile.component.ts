import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir:File;
  imagenTemporal:any;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }
  guardarUsuario(usuario: Usuario){
    if(!this.usuario.google){
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe((response)=> {});
  }
  seleccionImagen(archivo: any){
    let evento = archivo.target.files[0];
    if(!evento){
      this.imagenSubir = null;
      return;
    }
    if(evento.type.indexOf('image') < 0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = evento;
    
    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(evento);
    reader.onload = () => this.imagenTemporal = reader.result;
  }
  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
