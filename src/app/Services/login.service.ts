import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlapp = 'https://localhost:44321/';
  private urlApi = 'api/Usuario/login/';

  constructor(private http:HttpClient) { }

  login(usuario:any):Observable<any>{
    return this.http.post(this.urlapp+this.urlApi,usuario)
  }

  getListPersonas(): Observable<any>{
    return this.http.get(this.urlapp + this.urlApi);
  }


}
