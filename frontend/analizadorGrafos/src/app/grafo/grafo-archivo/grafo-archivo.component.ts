import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrafoModel } from 'src/app/modelos/grafoModel';
import { GrafoService } from '../grafo.service';
import { debounceTime } from 'rxjs';
import { NodoModel } from 'src/app/modelos/nodoModel';
import { EdgeModel } from 'src/app/modelos/edgeModel';
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
  formFile: FormGroup;

  getLista(limSup: number) {
    let lista = [];
    for (let index = 0; index < limSup; index++) {
      lista.push(index);
    }
    return lista;
  }
  grafoTemp: GrafoModel;
  nodosData: NodoModel[];
  edgesData: EdgeModel[];
  //vec1: NodoModel[] = [{ id: 'uno', text: '1', color: 'black' }, { id: 'dos', text: '2', color: 'black' }];
  dataJson: GrafoModel;

  ngOnInit(): void {

  }
  constructor(private formBuilder: FormBuilder, private grafoService: GrafoService, private router: Router) {
    this.BuildForm();
  }
  private BuildForm() {
    this.formGrafo = this.formBuilder.group({
      name: ['', [Validators.required]],
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

  /**
   * adiciona a la lista de nodos los datos del formulario
   */
  addNodo() {
    let text = this.formGrafo.get('text')!.value;
    let color = this.formGrafo.get('color')!.value;
    let id = text;
    if (color == null) color = 'orange';
    let nodo = { id: id, text: text, color: color };
    if (this.siExisteNodo(id) == false) {
      if (this.nodosData == null) this.nodosData = [nodo];
      else this.nodosData.push(nodo);
    } else {
      alertToast('nodo ya existente')
      this.formGrafo.get('text')!.setValue('');
      this.formGrafo.get('color')!.setValue('');
      console.log(this.nodosData);
    }
  }
  /**
   * buscar en la lista de nodos si existe el nodo
   * @param id recibe el id del nodo a buscar
   * @returns devuelve true si existe el nodo, false si no existe
   */
  siExisteNodo(id: string) {
    if (this.nodosData != null) {
      for (let nodo in this.nodosData) {
        if (this.nodosData[nodo].id == id) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   *  valida si se ingreso una key existente en las edges
   * @returns devuelve true si existe, false si no existe
   **/
  siExisteEdge(key: string) {
    if (this.edgesData != null) {
      for (let edge in this.edgesData) {
        if (this.edgesData[edge].key == key) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * adicina a la lista de edges los datos del formulario
   */
  addEdge() {
    let from = this.formGrafo.get('from')!.value;
    let to = this.formGrafo.get('to')!.value;
    let key = this.formGrafo.get('key')!.value;
    let edge = { from: from, to: to, key: key };
    if (this.siExisteEdge(key) == false) {
      if (this.siExisteNodo(from) && this.siExisteNodo(to)) {
        if (this.edgesData == null) this.edgesData = [edge];
        else {
          this.edgesData.push(edge)
          this.formGrafo.get('from')!.setValue('');
          this.formGrafo.get('to')!.setValue('');
          this.formGrafo.get('key')!.setValue('');
          console.log(this.edgesData);
        }
      } else alertToast('nodos no existentes');
    } else alertToast('edge con key ya existente');
  }
  /**
   * formulario para crear el grafo y enviarlo a la base de datos.
   * Este nos redirecciona a la lista de grafos
   * @param event
   */
  addGrafo(event: Event) {
    //**validar datos formulario y crear grafoTemp */
    event.preventDefault();
    if (this.formGrafo.valid && this.nodosData != null && this.edgesData != null) {
      let name = this.formGrafo.get('name')!.value;
      let adjacencies = [{}];
      this.grafoTemp = {
        _id: this.generarIdUnico(),
        name: name,
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
  datosFile(event: any): any {
    let fileCaptur = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(fileCaptur);
    reader.onload = (e) => {
      let data = reader.result;
      let dataS: string = data!.toString();

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
  /**
   * generar id unico para el grafo
   */
  generarIdUnico() {
    let ahora = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = (ahora + Math.random() * 16) % 16 | 0;
      ahora = Math.floor(ahora / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }
    );
    return uuid;
  }



}

