import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  recordar_cuenta: boolean = false;

  auth2:any;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();/*Poner en version de produccion*/
    this.email = "test1@test.com";
    this.password = "123";
    this.email = localStorage.getItem('email') || '';/*Poner en version de produccion*/
    if(this.email.length > 1){
      this.recordar_cuenta = true;
    }
  }

  googleInit(){
    gapi.load('auth2', ()=> {
      this.auth2 = gapi.auth2.init({
        client_id: '24460029465-8l5otp83q9fitqfprj2s8f5ig9o3t7mh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }
  attachSignin(element){
    this.auth2.attachClickHandler(element, {}, (googleUser)=> {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe((response)=> {
        this.router.navigate(['/dashboard']);
      });
    });
  }


  ingresar(forma: NgForm){
    if(!forma.valid){
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    
    this._usuarioService.login(usuario, forma.value.recordar_cuenta)
    .subscribe(response => this.router.navigate(['/dashboard']));
  }

}
