import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//sweetAlert-Import
import swal from 'sweetalert';

import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  numeroTest: number = 0;//IMPORTANTE!!!quitar

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  CompararCampos(campo1:string, campo2:string){
    return (group: FormGroup)=> {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if(pass1 === pass2){
        return null;
      }
      return {
        sonIguales: true
      };
    }
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.CompararCampos('password', 'password2')});

    this._usuarioService.cargarUsuarios(0).subscribe((res: any) => {
      this.numeroTest = res.totalUsuarios + 1;
    });
    console.log(this.numeroTest);
    /*Quiter lo de arriba cuando se suba a produccion */
  }
  registrarUsuario(){
    this.forma.setValue({
      nombre: `Test ${this.numeroTest}`,
      email: `test${this.numeroTest}@test.com`,
      password: '123',
      password2: '123',
      condiciones: true
    });
    this.numeroTest = this.numeroTest + 1;
    console.log(this.numeroTest);
    /*
    IMPORTANTE!!!quitar la parte de arriba cuando se suba a produccion es solo para crear usuarios de una manera mas facil
    */
    if(!this.forma.valid){
      return;
    }
    if(!this.forma.value.condiciones){
      swal("Terminos y Condiciones", "debe de aceptar las condiciones", "warning");
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );
    
    this._usuarioService.crearUsuario(usuario).subscribe(response=>{
      this.router.navigate(['/register']);
      //IMPORTANTE!!!Cambiar la navegacion a login
      return;
    });
  }

}
