import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {

  //Resivira informacion desde el template donde se use el selector
  @Input() doughnutChartData:string[];
  @Input() doughnutChartLabels:string[];
  @Input() doughnutChartType:string[];

  constructor() {}

  ngOnInit() {
  }

}
