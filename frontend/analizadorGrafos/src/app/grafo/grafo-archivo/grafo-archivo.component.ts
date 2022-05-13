import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';
import { debounceTime } from 'rxjs';
import { NodoModel } from 'src/app/modelos/nodoModel';
//para llamar js en ts de materialize
declare var alertToast: any;
declare var mostrarModal: any;
@Component({
  selector: 'app-grafo-archivo',
  templateUrl: './grafo-archivo.component.html',
  styleUrls: ['./grafo-archivo.component.css']
})
export class GrafoArchivoComponent implements OnInit {
  public archivos: any = [];
  validar = false;
  //crea el object formulario
  formGrafo: FormGroup;
  formFile : FormGroup;

  getLista(limSup: number) {
    let lista = [];
    for (let index = 0; index < limSup; index++) {
      lista.push(index);
    }
    return lista;
  }
  grafoTemp: GrafoModel;
  nodosData: NodoModel[];
  edgesData: Object[];
  //vec1: NodoModel[] = [{ id: 'uno', text: '1', color: 'black' }, { id: 'dos', text: '2', color: 'black' }];
  dataJson: GrafoModel;

  ngOnInit(): void {

  }
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
    this.formFile = this.formBuilder.group({
      file: ['', [Validators.required]]
    });
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
  siExisteNodo(id: string) {
    for (let nodo in this.nodosData) {
      if (this.nodosData[nodo].id == id) {
        return true;
      }
    }
    return false;
  }
  addEdge() {
    let from = this.formGrafo.get('from')!.value;
    let to = this.formGrafo.get('to')!.value;
    let key = this.formGrafo.get('key')!.value;
    let edge = { from: from, to: to, key: key };
    if (this.siExisteNodo(from) && this.siExisteNodo(to)) {
      if (this.edgesData == null) this.edgesData = [edge];
      else this.edgesData.push(edge);
      this.formGrafo.get('from')!.setValue('');
      this.formGrafo.get('to')!.setValue('');
      this.formGrafo.get('key')!.setValue('');
      //M.toast({html: 'I am a toast!'})
      console.log(this.edgesData);
    } else alertToast('nodos no existentes');
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
      } else alertToast('grafo no valido');

    }
    else {
      alertToast('Favor dellenar todos los campos');
    }

  }


  //TODO: validar archivo en la carga de datos

  /**
   * recepcion de datos del archivo
   * @param event evento de file
   */
  datosFile(event: any): any{
    let fileCaptur = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(fileCaptur);
    reader.onload = (e) => {
      let data = reader.result;
      let dataS : string = data!.toString();

      this.dataJson = JSON.parse(dataS);
      //console.log(this.dataJson);
    }
  }

  capturarFile(event: Event) {
    event.preventDefault();
    if (this.dataJson != null) {
      //save grafo
      this.grafoService.createGrafo(this.dataJson).subscribe(
        (data: any) => {
          console.log(data);
        });
      //router id
      alertToast('Grafo cargado');
      this.router.navigate(['/grafo-listar']);
    } else alertToast('grafo no valido');

  }



}

