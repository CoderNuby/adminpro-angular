import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  token: string;

  constructor(
    public http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  cargarHospitales(desde: number){
    let url = URL_SERVICIOS +`/hospital?desde=${desde}`;
    return this.http.get(url).pipe(map((resp: any) => {
      this.totalHospitales = resp.totalHospitales;
      console.log('Total hospitales',this.totalHospitales);
      return resp.hospitales;
    }));
  }

  obtenerHospital(id: string){
    let url = URL_SERVICIOS +`/hospital/${id}`
    return this.http.get(url).pipe(map((resp: any)=> {
      resp.hospital;
    }));
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + `/hospital/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(map((res: any) => {
      swal('Mensaje', res.mensaje,'success');
    }));
  }
 
  crearHospital(nombre: string){
    let url = URL_SERVICIOS + `/hospital?token=${this.token}`;
    return this.http.post(url, {nombre: nombre}).pipe(map((res: any) => {
      res.hospital;
    }));
  }

  buscarHospital(termino: string){
    let url = URL_SERVICIOS + `/busqueda/coleccion/hospital/${termino}`;
    return this.http.get(url).pipe(map((resp: any)=> {
      resp.hospital;
    }));
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + `/hospital/${hospital._id}?token=${this.token}`;
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      resp.hospital;
    }));
  }
}
