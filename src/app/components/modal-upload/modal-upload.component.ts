import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  activar: string = '';
  imagenSubir:File;
  imagenTemporal:any;
  usuario: Usuario;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }
  subirImagen(){
    console.log('subir imagen');
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
}
