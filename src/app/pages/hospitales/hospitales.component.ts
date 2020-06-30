import { Component, OnInit } from '@angular/core';
import { HospitalService, UsuarioService } from 'src/app/services/service.index';


import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  desde: number = 0;

  totalHospitales: number;

  cargando: boolean = true;

  mostrarEdicion: boolean = false;

  UsuarioLogeado: Usuario;

  hospitales: Hospital[];

  constructor(
    private _hospitalServices: HospitalService,
    private usuarioServices: UsuarioService
  ) { }

  ngOnInit() {
    this.UsuarioLogeado = this.usuarioServices.usuario;
    this.mostrarEdicion = this.UsuarioLogeado.role == "ADMIN_ROLE";
    this.cargarHospitales();
  }

  cargarHospitales(){
    this.cargando = true;
    this._hospitalServices.cargarHospitales(this.desde).subscribe((res: any)=> {
      this.hospitales = res;
      this.totalHospitales = this._hospitalServices.totalHospitales;
      this.cargando = false;
    });
  }

  salioBusqueda(valor: string){
    if(valor.length <= 0){
      this.desde = 0;
      this.cargarHospitales();
    }
  }

  buscarHospital(){

  }

}
