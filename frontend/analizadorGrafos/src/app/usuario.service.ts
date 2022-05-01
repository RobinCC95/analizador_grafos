import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private BASE_URL = 'http://localhost:5000/users/';
  constructor(private http : HttpClient) { }

  getListUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}listar-user`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}add-user`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}delete-user/${id}`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}get-user/${id}`);
  }




}
