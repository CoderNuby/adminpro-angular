import { Component, OnInit } from '@angular/core';
//sweetAlert-Import
import swal from 'sweetalert';
import { SubirArchivoService, ModalUploadImagenService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal-upload-imagen',
  templateUrl: './modal-upload-imagen.component.html',
  styleUrls: ['./modal-upload-imagen.component.css']
})
export class ModalUploadImagenComponent implements OnInit {

  

  imagenSubir:File;
  imagenTemporal:any;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    public _modalUploadImagenService: ModalUploadImagenService
  ) { }

  ngOnInit() {
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

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemporal = null;

    this._modalUploadImagenService.mostartModal(false);
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadImagenService.coleccion, this._modalUploadImagenService.id).then(resp => {
      console.log("subir Imagen: ", resp);
      this._modalUploadImagenService.notificar.emit(resp);
      this.cerrarModal();
    }).catch(error => {
      console.log("Error en la carga: ",error);
    });
  }
}
