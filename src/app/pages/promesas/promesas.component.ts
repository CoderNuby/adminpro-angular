import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    
    this.PromesaConteo().then(function(data){
      console.log("Termino", data);
    }).catch(function(error){
      console.error("Error en la promesa", error);
    });
  }

  ngOnInit() {
  }
  PromesaConteo(): Promise<boolean>{
      return new Promise( function(resolve, reject){
      let contador: number = 0;
      let intervalo = setInterval(function(){
        contador = contador + 1;
        if(contador == 5){
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
