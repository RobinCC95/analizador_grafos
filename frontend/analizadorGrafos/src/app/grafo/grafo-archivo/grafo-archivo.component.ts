import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';

@Component({
  selector: 'app-grafo-archivo',
  templateUrl: './grafo-archivo.component.html',
  styleUrls: ['./grafo-archivo.component.css']
})
export class GrafoArchivoComponent implements OnInit {
  public archivos: any = []
  numNodos: number = 0;
  numEdges: number = 0;
  validar = false;

  getLista(limSup:number){
    let lista = [];
    for (let index = 0; index < limSup; index++) {
      lista.push(index);
    }
    return lista;
  }
  grafoTemp: GrafoModel;
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


  addNodo(nodo:any){
    console.log('add nodo');
  }
  addEdge(edge:any){
    console.log('add edge');
  }
  addGrafo(datos:any){
    console.log('enviar grafo');

    //**validar datos formulario y crear grafoTemp */

    //save grafo
    this.grafoService.createGrafo(this.grafoTemp);
    //router id
    this.router.navigate(['/grafo-view',this.grafoTemp._id]);

  }

  capturarFile(event: any):any{
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado)
    console.log(archivoCapturado);
  }


  constructor(private grafoService : GrafoService, private router: Router) { }

  ngOnInit(): void {
  }

}
