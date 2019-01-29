import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-graficas1',
    templateUrl: './graficas1.component.html',
    styleUrls: []
})

export class Graficas1Component implements OnInit{
    
    //Objeto con informacion para la grafica
    graficos: any = {
        'graficos1': {
            'labels': ['Con Frijoles', 'Con Natilla', 'Con tocino'],
            'data': [24, 30, 46],
            'type': 'doughnut',
            'leyenda': 'El pan se come con'
        },
        'graficos2': {
            'labels': ['Hombres', 'Mujeres'],
            'data': [4500, 6000],
            'type': 'doughnut',
            'leyenda': 'Entrevistados'
        },
        'graficos3': {
            'labels': ['Si', 'No'],
            'data': [95, 5],
            'type': 'doughnut',
            'leyenda': '¿ Le dan gases los frijoles ?'
        },
        'graficos4': {
            'labels': ['No', 'Si'],
            'data': [85, 15],
            'type': 'doughnut',
            'leyenda': '¿ Le importa que le den gases?'
        },
        'graficos5': {
            'labels': ['Rock', 'Blues', 'Pop', 'Clasico', 'Folk/Country', 'Flamenco/Folclore'],
            'data': [480, 318, 258, 227, 201, 107],
            'type': 'doughnut',
            'leyenda': 'Musica Mas Escuchada'
        }
    };    

    constructor(){}

    ngOnInit(){

    }
}