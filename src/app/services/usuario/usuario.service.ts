import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


//sweetAlert-Import
import swal from 'sweetalert';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
//Servicio
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarLocalStorage();
  }
  Logeado(){
    return(this.token.length > 5)? true:false;
  }
  cargarLocalStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }
  guardarInformacionLocalStorage(id:string, token:string, usuario:Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }
  logOut(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  loginGoogle(token:string){
    let url = URL_SERVICIOS+'/login/google';
    return this.http.post(url, {token}).pipe(map((response:any) => {
      this.guardarInformacionLocalStorage(response.id, response.token, response.usuario);
      return true;
    }));
  }
  login(usuario: Usuario, recordar_cuenta:boolean = false){
    if(recordar_cuenta){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS+'/login';
    return this.http.post(url, usuario).pipe(map((response:any) => {
      this.guardarInformacionLocalStorage(response.id, response.token, response.usuario);
      return true;
    }));
  }
  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'/usuario';
    return this.http.post( url, usuario)
   .pipe(map( (resp: any) => {
      swal("Bienvenido " + usuario.nombre, "su registro a sido creado exitosamente", "success");
      return resp.usuario;
    }));
  }
  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'/usuario/'+usuario._id+'?token='+this.token;
    return this.http.put(url, usuario).pipe(map( (resp: any) => {
      //guardar cambios en el localstorage
        
      swal("Usuario Actualizado", "Name: "+usuario.nombre+"\n"+"Email: "+usuario.email+"\n"+"Role: "+usuario.role, "success");
      if(usuario._id == this.usuario._id){
        //Actualiza el localStorage solo si el usuario que esta logiado es el mismo al que se le realizaron los cambios
        let user: Usuario = resp.usuario;
        this.guardarInformacionLocalStorage(user._id, this.token, user);
      }
      return true;
    }));
  }
  cambiarImagen(file:File, id:string){
    this._subirArchivoService.subirArchivo(file, 'usuarios', id).then((res:any) => {
      this.usuario.imagen = res.usuarioActualizado.imagen;
      swal('Imagen Actualizada', this.usuario.nombre,'success');
      this.guardarInformacionLocalStorage(id, this.token, this.usuario);
    }).catch(res => {
      console.log(res);
    });
  }

  cargarUsuarios(desde: number = 0, registroPerPage: number = 12){
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}&limit=${registroPerPage}&token=${this.token}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/usuario/'+termino;
    return this.http.get(url).pipe(map((res:any) => res.usuario));
  }
  
  //Borrar usuario
  borrarUsuario(id: string){
    let url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(map((res: any)=> res.usuario ));
  }
}