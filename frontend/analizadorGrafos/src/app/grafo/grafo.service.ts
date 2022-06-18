import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrafoModel } from '../modelos/grafoModel';
import { DataAnalisis } from '../modelos/dataAnalisis';
@Injectable({
  providedIn: 'root'
})
export class GrafoService {

  private BASE_URL = 'http://localhost:5000/grafos/';
  constructor(private http : HttpClient) { }
  /**
   * lista d grafos
   * @returns retorna la lista de grafos de la base de datos
   */
  getListGrafos(): Observable<any> {
    return this.http.get(`${this.BASE_URL}listar-grafo`);
  }
  /**
   * almacenar un grafo en la base de datos
   * @param grafo objeto grafo que se va a guardar en la base de datos
   * @returns envia el dato al servidor
   */
  createGrafo(grafo: GrafoModel): Observable<any> {
    return this.http.post(`${this.BASE_URL}add-grafo`, grafo);
  }

  deleteGrafo(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete-grafo/${id}`);
  }

  getGrafo(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}get-grafo/${id}`);
  }

  updateGrafo(grafo: GrafoModel): Observable<any> {
    return this.http.put(`${this.BASE_URL}update-grafo`, grafo);
  }

  analizarGrafo(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}analizar-grafo/${id}`);
  }
}
