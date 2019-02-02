import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  ajustes: Ajustes= {
    temaUrl: 'assets/css/colors/default.css',
    tema:'default'
  }

  constructor( @Inject(DOCUMENT)private _document) {
    this.cargarAjustes();
   }

  guardarAjustes(){
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    }
  }
  aplicarTema(tema: string){
    //Cambia la url del tema de index.html(cambia el color)
    let url =`assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);
    //Guardar datos de tema en localStorage
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}