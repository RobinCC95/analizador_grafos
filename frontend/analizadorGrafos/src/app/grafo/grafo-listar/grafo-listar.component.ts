import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
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
  public grafoArray : GrafoModel[];
  nodes: object = [];
  edges: object = [];
  validar = false;

  constructor(private grafoService: GrafoService, private router : Router) { }

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
  drawGrafo(grafoId:string){
    console.log(grafoId);
    this.router.navigate(['/grafo-view',grafoId]);

  }
  deleteGrafo(grafoId:string){
    console.log(grafoId);
    this.grafoService.deleteGrafo(grafoId).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );

  }





}
