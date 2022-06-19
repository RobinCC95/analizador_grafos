import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataAnalisis } from 'src/app/modelos/dataAnalisis';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';
//para llamar js en ts de materialize
declare var alertToast: any;

@Component({
  selector: 'app-grafo-listar',
  templateUrl: './grafo-listar.component.html',
  styleUrls: ['./grafo-listar.component.css']
})

export class GrafoListarComponent implements OnInit {
  public grafoArray: GrafoModel[];
  nodes: object = [];
  edges: object = [];
  validar = false;

  constructor(private grafoService: GrafoService, private router: Router) { }

  ngOnInit(): void {

    this.grafoService.getListGrafos().subscribe(
      data => {
        console.log(data);
        this.grafoArray = data.data;
      },
      error => console.log(error)
    );
    alertToast('Regargue la pagina para ver los cambios');
    /*
    this.grafoService.getGrafo("16534684").subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );*/

  }
  drawGrafo(grafoId: string) {
    console.log(grafoId);
    this.router.navigate(['/grafo-view', grafoId]);

  }
  /**
   * funcion que busca el grafo en el array de grafos
   * @param grafoID id del grafo a buscar
   * @returns retorna el grafo encontrado o null si no lo encuentra
   */
  buscarGrafo(grafoID: string) {
    let grafo: GrafoModel | null = null;
    for (let i = 0; i < this.grafoArray.length; i++) {
      if (this.grafoArray[i]._id == grafoID) {
        grafo = this.grafoArray[i];
        return this.grafoArray[i];
      }
    }
    return grafo;
  }
  deleteGrafo(grafoId: string) {
    console.log(grafoId);
    this.grafoService.deleteGrafo(grafoId).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );

  }
  analizarGrafo(grafoID: string) {
    let grafo : GrafoModel | null = this.buscarGrafo(grafoID);
    let tipPart = document.getElementById('tipo-particion') as HTMLInputElement;
    let tipParticion = tipPart.value;
    let dataPart: DataAnalisis = {
      grafo: grafo,
      particion: tipParticion
    }
    //console.log(dataPart);
    this.grafoService.analizarGrafo(dataPart).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
    //TODO: Hacer retardo y validacion para ir a la pagina editar
    this.router.navigate(['/grafo-analizar']);
  }

}
