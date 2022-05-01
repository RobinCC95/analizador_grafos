import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  createGrafo(grafo: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}crear-grafo`, grafo);
  }

  deleteGrafo(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete-grafo/${id}`);
  }

  getGrafo(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}get-grafo/${id}`);
  }
}
