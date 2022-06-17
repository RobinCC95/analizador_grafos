import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrafoService } from '../grafo.service';

declare var alertToast: any;

@Component({
  templateUrl: './grafo-analizar.component.html',
  styleUrls: ['./grafo-analizar.component.css']
})
export class GrafoAnalizarComponent implements OnInit {

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
  }

  envioPetAnalisis(event : Event) {
    let dataAnali = {
      id: this.formAnalisis.value.id,
      particion: this.formAnalisis.value.particion
    };
    event.preventDefault();
    if(this.formAnalisis.valid){
      // TODO: Peticion al servidor del analisis de grafo
     /* this.grafoService.analizarGrafo(dataAnali).subscribe(
        (data: any) => {
          console.log(data);
        });*/
        console.log(dataAnali);

    }
    else{
      alertToast('Favor dellenar todos los campos');
    }
  }
}
