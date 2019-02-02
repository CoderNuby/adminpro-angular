import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  changeTheme(tema:string, link:any){
    console.log(tema,link);

    //Remueve la clase working de los elementos
    let seloctors:any = document.getElementsByClassName('selector');
    for(let element of seloctors){
      element.classList.remove('working');
    }
    //Adiere la clase working
    link.classList.add('working');
    this._ajustes.aplicarTema(tema);
  }
  colocarCheck(){
    let seloctors:any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for(let elemento of seloctors){
      if(tema === elemento.getAttribute('data-theme')){
        elemento.classList.add('working');
        break;
      }
    }
  }
}
