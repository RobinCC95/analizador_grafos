import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-grafo-archivo',
  templateUrl: './grafo-archivo.component.html',
  styleUrls: ['./grafo-archivo.component.css']
})
export class GrafoArchivoComponent implements OnInit {
  public archivos: any = [];
  validar = false;
  formGrafo: FormGroup;

  getLista(limSup: number) {
    let lista = [];
    for (let index = 0; index < limSup; index++) {
      lista.push(index);
    }
    return lista;
  }
  grafoTemp: GrafoModel;
  nodosData: Object[];
  edgesData: Object[];

  constructor(private formBuilder: FormBuilder, private grafoService: GrafoService, private router: Router) {
    this.BuildForm();
  }
  private BuildForm() {
    this.formGrafo = this.formBuilder.group({
      _id: ['', [Validators.required]],
      //id: [],
      text: [],
      color: [],
      key: [],
      from: [],
      to: []

    });
  }

  ngOnInit(): void {
  }

  addNodo() {
    let text = this.formGrafo.get('text')!.value;
    let color = this.formGrafo.get('color')!.value;
    let id = text;
    let nodo = { id: id, text: text, color: color };
    if (this.nodosData == null) this.nodosData = [nodo];
    else this.nodosData.push(nodo);
    this.formGrafo.get('text')!.setValue('');
    this.formGrafo.get('color')!.setValue('');
    console.log(this.nodosData);
  }
  addEdge() {
    let from = this.formGrafo.get('from')!.value;
    let to = this.formGrafo.get('to')!.value;
    let key = this.formGrafo.get('key')!.value;
    let edge = { from: from, to: to, key: key };
    if (this.edgesData == null) this.edgesData = [edge];
    else this.edgesData.push(edge);
    this.formGrafo.get('from')!.setValue('');
    this.formGrafo.get('to')!.setValue('');
    this.formGrafo.get('key')!.setValue('');
    //M.toast({html: 'I am a toast!'})
    console.log(this.edgesData);
  }
  addGrafo(event: Event) {
    //**validar datos formulario y crear grafoTemp */
    event.preventDefault();
    if (this.formGrafo.valid && this.nodosData != null && this.edgesData != null) {
      let _id = this.formGrafo.get('_id')!.value;
      let adjacencies = [{}];
      let user = {
        idUser: '1',
        name: 'robin',
      };
      this.grafoTemp = {
        _id: _id,
        user: user,
        nodes: this.nodosData,
        edges: this.edgesData,
        adjacencies: adjacencies
      };
      console.log(this.grafoTemp);
      if (this.grafoTemp != null) {
        //save grafo
        this.grafoService.createGrafo(this.grafoTemp).subscribe(
          (data: any) => {
            console.log(data);
          });
        //router id
        this.router.navigate(['/grafo-listar']);
      }else alert('grafo no valido');

    }
    else {
      alert('Favor dellenar todos los campos');
    }



  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0]
    this.archivos.push(archivoCapturado)
    console.log(archivoCapturado);
  }



}
