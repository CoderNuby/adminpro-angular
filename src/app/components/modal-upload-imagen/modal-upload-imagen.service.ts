import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadImagenService {

  public coleccion: string;
  public id: string;

  public mostrar: boolean = false;

  public notificar = new EventEmitter<any>();

  constructor() { }



  mostartModal(mostrar: boolean, coleccion: string = "", id: string = ""){
    this.mostrar = mostrar;
    if(this.mostrar){
      console.log("MODAL ACTIVADO");
      this.id = id;
      this.coleccion = coleccion;
    }else{
      console.log("SE CERRO EL MODAL");
      this.coleccion = null;
      this.id = null;
    }
  }
}
