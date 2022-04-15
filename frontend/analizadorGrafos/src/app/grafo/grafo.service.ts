import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GrafoService {

  /*grafo = {
    name : "",
    nodes: [{
        id: "",
        dato: ""
      }
    ] ,
    edges: [
      {
        id:"",
        peso:""
      }
    ],
    adjacecencies: [
      {
        begin:"",
        finish:"",
        edge:""
      }
    ]
  }*/

  constructor() { }

  getListGrafos(){}

  editGrafo(grafo:any){}

  saveGrafo(grafo:any){}

  deleteGrafo(grafo:any){}
}
