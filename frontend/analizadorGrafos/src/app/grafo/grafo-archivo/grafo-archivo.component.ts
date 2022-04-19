import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafo-archivo',
  templateUrl: './grafo-archivo.component.html',
  styleUrls: ['./grafo-archivo.component.css']
})
export class GrafoArchivoComponent implements OnInit {

  validar = false;
  nodosData = [
    { id: 'uno', text: "uno", color: 'blue' },
      { id: 'dos', text: "dos", color: 'green' },
      { id: 'tres', text: "tres", color: 'red' }
    ];
  edgesData = [
    { key: 1, from: 'uno', to: 'dos' },
    { key: 2, from: 'dos', to: 'tres' },
    { key: 3, from: 'tres', to: 'uno' }
  ];

  graficarGrafoData() {
    this.validar = this.validar ? false : true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
