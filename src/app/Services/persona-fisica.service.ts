import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaFisicaService {

  private urlapp = 'https://localhost:44321/';
  private urlApi = 'api/PersonaFisica/';


  constructor(private http: HttpClient) { }

  getListPersonas(): Observable<any>{
    return this.http.get(this.urlapp + this.urlApi);
  }

  ObtenerPersonaId(id: number): Observable<any>{
    return this.http.get(this.urlapp + this.urlApi +id)
  }

  deletePersona(id: number): Observable<any>{
    return this.http.delete(this.urlapp + this.urlApi + id);
  }

  savePersona(persona:any):Observable<any>{
    return this.http.post(this.urlapp + this.urlApi, persona);
  }

  actualizarPersona(id: number, persona:any): Observable<any>{
    return this.http.put(this.urlapp + this.urlApi + id, persona);
  }



}
