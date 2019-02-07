import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';



@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    
    this.subscription = this.regresaObservable().subscribe(function(numero){
      console.log(numero);
    },
    function(error){
      console.error(error);
    },
    function(){
      console.log("El observador termino");
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log("Destruir elemento");
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{
    return new Observable(function (observer: Subscriber<any>){
      let contador = 0;
      let intervalo = setInterval(function(){
        contador = contador + 1;
        const salida = {
          valor: contador
        }
        observer.next(salida);
        // if(contador == 20){
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador == 2){
        //   clearInterval(intervalo);
        //   observer.error("Auxilio!!");
        // }
      },1000);
    }).pipe(
      map(function(resp){
        return resp.valor;
      }),
      filter(function(valor, index){
        if(valor%2 == 0){
          return true;
        }else return false;
      })
    );
    //El operador map() devuelve el valor deseado a todos los subscribe
  }

}
