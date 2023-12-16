import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Client } from 'src/app/model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _httpClient: HttpClient) {}

  getClients():Observable<Client[]> {
    return this._httpClient.get<Client[]>(`http://localhost:8080/client/`);
  }
  
  getClient(cin:string):Observable<Client>{
    return this._httpClient.get<Client>(`http://localhost:8080/client/${cin}`)
  }

  addClient(client:Client): Observable<any> {
    return this._httpClient.post<any>(`http://localhost:8080/client/`, client);
  }

  updateClient(cin: string, updatedClient:Client): Observable<any> {
    return this._httpClient.put(`http://localhost:8080/client/${cin}`, updatedClient);
  }

  deleteClient(cin: string): Observable<void> {
    return this._httpClient.delete<void>(`http://localhost:8080/client/${cin}`);
  }


}
