import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataAnalisis } from 'src/app/modelos/dataAnalisis';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';

declare var alertToast: any;

@Component({
  templateUrl: './grafo-analizar.component.html',
  styleUrls: ['./grafo-analizar.component.css']
})
export class GrafoAnalizarComponent implements OnInit {
  public grafoArray: GrafoModel[];
  nodes: object = [];
  edges: object = [];
  validar = false
  formAnalisis: FormGroup;

  constructor(private formBuilder: FormBuilder, private grafoService: GrafoService, private router: Router) {
    this.BuildForm();
  }

  private BuildForm() {
    this.formAnalisis = this.formBuilder.group({
      id: ['', [Validators.required]],
      particion: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.grafoService.getListarGrafoAnalizado().subscribe(
      data => {
        console.log(data);
        this.grafoArray = data.data;
      },
      error => console.log(error)
    );
    alertToast('Regargue la pagina para ver los cambios');
  }

  envioPetAnalisis(event : Event) {
    let dataAnali : DataAnalisis = {
      grafo: this.formAnalisis.value.id,
      particion: this.formAnalisis.value.particion
    };
    event.preventDefault();
    if(this.formAnalisis.valid){
      // TODO: Peticion al servidor del analisis de grafo
    this.grafoService.analizarGrafo(dataAnali).subscribe(
        (data: any) => {
          console.log(data);
        });
        console.log(dataAnali);

    }
    else{
      alertToast('Favor dellenar todos los campos');
    }
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
    this.grafoService.deleteGrafoAnalizado(grafoId).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );

  }
  drawGrafo(grafoId: string) {
    console.log(grafoId);
    this.router.navigate(['/grafo-view', grafoId]);

  }
}
