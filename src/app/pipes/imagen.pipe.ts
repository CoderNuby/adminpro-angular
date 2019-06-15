import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, coleccion: string = 'usuarios'): any {
    let url = URL_SERVICIOS+'/imagenes';
    if(!imagen){
      return url+"/"+coleccion+"/noImagen";
    }
    //Si es imagen de google
    if(imagen.indexOf('https') >= 0){
      return imagen;
    }
    if(!(coleccion === "usuarios" || coleccion === "medicos" || coleccion === "hospitales")){
      return console.log('El nombre de la coleccion no es valido: usuarios, medicos, hospitales');
    }
    return url+"/"+coleccion+"/"+imagen;
  }
}
