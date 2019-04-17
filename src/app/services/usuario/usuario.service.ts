import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


//sweetAlert-Import
import swal from 'sweetalert';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token:string;

  constructor(
    public http: HttpClient,
    public router: Router
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
  };
  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+'/usuario';
    return this.http.post( url, usuario)
   .pipe(map( (resp: any) => {
      swal("Bienvenido " + usuario.nombre, "su registro a sido creado exitosamente", "success");
      return resp.usuario;
    }));
  }
}
