import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtPorcentaje:ElementRef;

  @Input('IncrementadorNombre') leyenda: string = 'NombreDeCampo';
  @Input('IncrementadorPorcentaje') porcentaje: number = 50;
  @Input('IncrementadorIncremento') incremento: number = 0;

  @Output('actualizarValor') cambioValor: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number){

    if(newValue >= 100){
      this.porcentaje = 100;
    }else if(newValue <= 0){
      this.porcentaje = 0;
    }else{
      this.porcentaje = newValue;
    }
    // elemHTML.value = Number(this.porcentaje);
    this.txtPorcentaje.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
    
  }

  cambiarValor(valor:number){
    if(this.porcentaje <= 0 && valor < 0){
      this.porcentaje = 0;
      return;
    }
    if(this.porcentaje >= 100 && valor > 0){
      this.porcentaje = 100;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtPorcentaje.nativeElement.focus();
  }
}
