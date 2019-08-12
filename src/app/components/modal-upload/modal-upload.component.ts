import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService, UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';
import { UsuariosComponent } from 'src/app/pages/usuarios/usuarios.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  public notificacion = new EventEmitter<any>();
  
  imagenSubir:File;
  imagenTemporal:any;
  usuario: Usuario;

  avisoHacerCambios: boolean;
  avisoBorrarUsuario: boolean;

  mostrarRole: boolean;
  formUsuario: FormGroup;
  EmailTemporal:string;
  NombreTemporal:string;
  RoleTemporal:string;

  @Input() usuarioEdit: Usuario;
  @Output() ActivarModal = new EventEmitter();

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService,
    public _usuariosComponent: UsuariosComponent,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioEdit;
    this.RoleTemporal = this.usuario.role;
    this.formUsuario = new FormGroup({
      nombre: new FormControl(this.usuario.nombre),
      email: new FormControl(this.usuario.email, Validators.email)
    });
    this.avisoHacerCambios = false;
    this.avisoBorrarUsuario = false;
    this.mostrarRole = this.usuario.role == 'USER_ROLE';
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
    console.log(this.imagenTemporal);
  }
  cambiarUsuario(){
    this.EmailTemporal = this.formUsuario.value.email;
    this.NombreTemporal = this.formUsuario.value.nombre;
    this.MostrarHacerCambios();
  }
  desactivarModal(){
    this.ActivarModal.emit(false);
  }
  MostrarHacerCambios(){
    this.avisoHacerCambios = true;
  }
  GuardarCambios(){
    this.usuario.email = this.EmailTemporal;
    this.usuario.nombre = this.NombreTemporal;
    this.usuario.role = this.RoleTemporal;
    console.log("imagen "+this.imagenSubir);
    if (this.imagenSubir) {
      console.log('Imagen a subir');
      this._subirArchivoService.subirArchivo(this.imagenSubir,'usuarios',this.usuario._id).then(res => {
        this._modalUploadService.notificacion.emit(res);
      }).catch(err => {
        console.log("Error en la carga: "+err);
      });
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe((res)=>{
      swal('Success', 'usuario actualizado correctamente','success');
      this.desactivarModal();
    });
  }
  MostrarAvisoBorrar(){
    this.avisoBorrarUsuario = true;
  }
  BorrarUsuario(){
    this._usuarioService.borrarUsuario(this.usuario._id).subscribe(res => {
      swal('Success','usuario borrado correctamente','success');
      this.desactivarModal();
      this._modalUploadService.notificacion.emit(res);
    });
  }
}
